import { Schema, models, model, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
    trim: true,
  },
  picture: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    trim: true,
  },
  portfolioWebsite: {
    type: String,
    trim: true,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  saved: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    default: [],
  },
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;
