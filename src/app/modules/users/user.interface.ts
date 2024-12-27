
import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isBlocked: boolean;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  // eslint-disable-next-line no-unused-vars
  isUserExistsByCustomId(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    plainTextPassword: string,
    // eslint-disable-next-line no-unused-vars
    hashedPassword: string,
  ): Promise<boolean>;
}


export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;

export type TUserRole = keyof typeof USER_ROLE;