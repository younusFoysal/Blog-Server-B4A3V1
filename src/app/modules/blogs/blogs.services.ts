

import { Tblog } from './blogs.interface';
import { BlogModel } from './blogs.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../users/user.model';


const createBlogIntoDB = async ( payload: Tblog) => {


  const result = await BlogModel.create(payload)

  return result;

};


const updateBlogIntoDB = async (payload: Partial<Tblog>, userEmail: string, id: string) => {

  const authorData = await User.findOne({ email: userEmail})

  if (!authorData){
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isBlogExists = await BlogModel.findOne({ author: authorData._id});

  const isBlogExistsIntoDB = await BlogModel.findById(id)

  if (!isBlogExistsIntoDB) {
    throw new AppError(httpStatus.NOT_FOUND, 'This blog is not found!');
  }


  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Unauthorized access to blog!');
  }

  const updatedBlog = await BlogModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

  return updatedBlog;
}



const deleteBlogIntoDB = async ( userEmail: string, id: string) => {

  const authorData = await User.findOne({ email: userEmail})

  if (!authorData){
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isBlogExists = await BlogModel.findOne({ author: authorData._id});

  const isBlogExistsIntoDB = await BlogModel.findById(id)

  if (!isBlogExistsIntoDB) {
    throw new AppError(httpStatus.NOT_FOUND, 'This blog is not found!');
  }


  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Unauthorized access to blog!');
  }

  const deletedBlog = await BlogModel.findByIdAndDelete(id);

  return deletedBlog;

}

const getAllBlogsFromDB = async () => {

  const blogs = await BlogModel.find().populate('author');

  return blogs;
}


export const blogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  getAllBlogsFromDB,
  deleteBlogIntoDB
}
