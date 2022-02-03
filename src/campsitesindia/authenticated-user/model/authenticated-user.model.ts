import dayjs from 'dayjs';
import { IUser } from '../../user/model/user.model';

export interface IAuthenticatedUser {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  authTimestamp?: string | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IAuthenticatedUser> = {};
