import mongoose, { Schema, Document } from 'mongoose';
import { IComment } from './Comment';


export interface IPost extends Document {
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  image?: string[];
  comments: mongoose.Schema.Types.ObjectId[];
  likes: mongoose.Schema.Types.ObjectId[];
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}
// Document Size Limit
// Documents in MongoDB must be smaller than 16 mebibytes.
// Ref to comment in Post.ts instead of embedding document
const PostSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: [{
    type: String,
    default: null
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  commentCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like'
  }],
  likeCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const Post = mongoose.model<IPost>('Post', PostSchema);