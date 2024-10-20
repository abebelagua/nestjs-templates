import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CONFIG_KEY_RUNTIME, RuntimeConfig } from './config/runtime';

import { AppModule } from './features/app';

const logger = new Logger('Bootstrap');

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	await app.listen(SERVER_PORT);
}
bootstrap();
