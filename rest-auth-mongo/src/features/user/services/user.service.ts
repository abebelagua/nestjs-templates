import { Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser } from '../interfaces';

const users: IUser[] = [];

@Injectable()
export class UserService {
	create(createUserDto: CreateUserDto) {
		const user: IUser = {
			id: uuidv7(),
			enableEmail: false,
			...createUserDto,
		};
		users.push(user);
		return user;
	}

	findAll() {
		return users;
	}

	findById(id: string) {
		return users.find((user) => user.id === id);
	}

	findOne(user: Partial<IUser>) {
		return users.find((us) => {
			Object.keys(user).every((key) => us[key] === user[key]);
		});
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		const index = users.findIndex((user) => user.id === id);
		const oldUser = users[index];
		users[index] = {
			...oldUser,
			...updateUserDto,
		};
		return users[index];
	}

	remove(id: string) {
		const index = users.findIndex((user) => user.id === id);
		users.splice(index, 1);
		return users[index];
	}

	getUserByPassword(username: string) {
		return users.find((user) => user.username === username);
	}
}
