import { Schema, models, model, Document } from 'mongoose';

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdAt: Date;
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  questions: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    default: [],
  },
  followers: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

const Tag = models.Tag || model<ITag>('Tag', TagSchema);

export default Tag;
