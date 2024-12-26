import { User } from '../users/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { BlogModel } from '../blogs/blogs.model';


const blockUserIntoDB = async (id: string) => {

  const isUserExist = await User.findById(id)

  if (!isUserExist) {
    throw new Error('User not found');
  }

  const isUserBlocked = await isUserExist?.isBlocked;

  if (isUserBlocked) {
    throw new Error('User is already blocked');
  }


  const result = await User.findByIdAndUpdate( id , { isBlocked: true}, {
    new: true,
    runValidators: true,
  });
  return result;
};


const deleteBlogIntoDB = async (  id: string) => {


  const isBlogExistsIntoDB = await BlogModel.findById(id)

  if (!isBlogExistsIntoDB) {
    throw new AppError(httpStatus.NOT_FOUND, 'This blog is not found!');
  }


  const deletedBlog = await BlogModel.findByIdAndDelete(id);

  return deletedBlog;

}


export const AdminServices = {
  blockUserIntoDB,
  deleteBlogIntoDB
};