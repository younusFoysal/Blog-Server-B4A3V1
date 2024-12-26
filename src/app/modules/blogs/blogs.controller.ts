

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { blogServices } from './blogs.services';
import { User } from '../users/user.model';
import AppError from '../../errors/AppError';
import { BlogModel } from './blogs.model';
import QueryBuilder from '../../builder/QueryBuilder';


const createBlog = catchAsync(async (req, res) => {
  const  blogData  = req.body;
  //console.log(req.)
  //console.log(blogData)

  const userEmail = req.user. userEmail;
  const authorId = await User.findOne({ email: userEmail})

  if (!authorId) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const newBlog = { ...blogData, author: authorId._id }
  console.log(newBlog)
  const result = await blogServices.createBlogIntoDB(newBlog);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is created successfully',
    data: result,
  });
});


const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const blogData = req.body;
  const userEmail = req.user.userEmail;


  const updatedBlog = await blogServices.updateBlogIntoDB(blogData, userEmail,  id );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is updated successfully',
    data: updatedBlog,
  });
})


const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userEmail = req.user.userEmail;

  const deletedBlog = await blogServices.deleteBlogIntoDB( userEmail, id );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog is Deleted successfully',
  });
})




const getAllBlogs = catchAsync(async (req, res) => {
  console.log('Received Query:', req.query);
  const queryBuilder = new QueryBuilder(BlogModel.find(), req.query);

  const blogs = await queryBuilder
    .search(['title', 'content'])
    .filter()
    .sort()
    .paginate()
    .fields()
    .modelQuery
    .populate('author');


  //const blogs = await blogServices.getAllBlogsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All blogs fetched successfully',
    data: blogs,
  });
})

export const blogControllers = {
  createBlog,
  updateBlog,
  getAllBlogs,
  deleteBlog
}