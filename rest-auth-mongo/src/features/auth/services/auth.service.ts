import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Role, UserPayload } from '../../../common';

import { UserService } from '../../user';
import { SignUpDto } from '../dto/signup.dto';

import { HashService } from './hash.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly hashService: HashService,
		private readonly usersService: UserService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string) {
		const user = this.usersService.getUserByPassword(username);

		if (user) {
			const validPassword = await this.hashService.compareHash(
				password,
				user.password,
			);
			if (validPassword) {
				return user;
			}
		}
		throw new HttpException('User not valid', HttpStatus.BAD_REQUEST);
	}

	async signup(signUpDto: SignUpDto) {
		const passwordHashed = await this.hashService.generateHash(
			signUpDto.password,
		);

		// Todo: connect to an email service and send an email link for verification. The email have been creating in enable by default

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = this.usersService.create({
			...signUpDto,
			password: passwordHashed,
			roles: [Role.User],
		});

		return user;
	}

	async login(user: UserPayload) {
		return {
			access_token: this.jwtService.sign(user),
		};
	}
}
