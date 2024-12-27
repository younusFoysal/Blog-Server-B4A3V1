
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';




const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken } = result;

  res.cookie('refreshToken',  {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {
      token: accessToken
    },
  });
});


export const AuthControllers = {
  loginUser,
};
