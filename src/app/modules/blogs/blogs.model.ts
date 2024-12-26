import { Tblog } from './blogs.interface';
import { model , Schema} from 'mongoose';


const BlogSchema = new Schema<Tblog>({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: String,
    ref: 'User'
  }

}, {timestamps: true, versionKey: false})

export const BlogModel = model<Tblog>('Blog', BlogSchema);