/* eslint-disable camelcase */
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response('Internal Server Error. Missing webhook secret.', {
      status: 500,
    });
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Bad Request. Missing headers.', { status: 400 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (e) {
    console.error('Error verifying webhook:', e);
    return new Response('SVIX signature cannot be verified.', { status: 401 });
  }

  const eventType = evt.type;
  console.log('Event type:', eventType);

  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    // Create a new user in DB.
    const mongoUser = await createUser({
      clerkId: id,
      email: email_addresses[0].email_address,
      picture: image_url,
      name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
      username: username!,
    });

    return NextResponse.json({ message: 'OK', user: mongoUser });
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    // Update existing user in DB.
    const updatedUser = await updateUser({
      clerkId: id,
      updateData: {
        email: email_addresses[0].email_address,
        picture: image_url,
        name: `${first_name}${last_name ? ` ${last_name}` : ''}`,
        username: username!,
      },
      path: `/profile/${id}`,
    });

    return NextResponse.json({ message: 'OK', user: updatedUser });
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    // Delete existing user in DB.
    const deletedUser = await deleteUser({
      clerkId: id!,
    });

    return NextResponse.json({ message: 'OK', user: deletedUser });
  }

  return NextResponse.json({ status: 204, statusText: 'No Content' });
}
