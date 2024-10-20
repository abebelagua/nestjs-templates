import { Role } from '../../../common';

export interface IUser {
	id: string;
	name: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	birthday: Date;
	roles: Role[];
	enableEmail: boolean;
}
