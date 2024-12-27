import httpStatus from 'http-status';
import config from '../../config';
import { TLoginUser } from './auth.interface';
import { User } from '../users/user.model';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';


const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }


  // checking if the user is Blocked
  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked !');
  }


  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(401, 'Invalid credentials');

  //create token and sent to the  client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    // eslint-disable-next-line no-undef
    config.jwt_access_secret as string,
    // eslint-disable-next-line no-undef
    config.jwt_access_expires_in as string,
  );



  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser
};

