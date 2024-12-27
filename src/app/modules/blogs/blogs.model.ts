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


BlogSchema.set('toJSON', {
  transform: (doc, rec) => {
    delete rec.createdAt;
    delete rec.updatedAt;
    return rec;
  }
})


export const BlogModel = model<Tblog>('Blog', BlogSchema);