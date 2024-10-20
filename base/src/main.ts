import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CONFIG_KEY_RUNTIME, RuntimeConfig } from './config/runtime';

import { AppModule } from './features/app';

const logger = new Logger('Bootstrap');

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService: ConfigService = app.get(ConfigService);
	const { API_URL, SERVER_PORT } =
		configService.get<RuntimeConfig>(CONFIG_KEY_RUNTIME);

	await app.listen(SERVER_PORT);

	logger.log(`Application is running on: ${API_URL}`);
	logger.log(`Application name: ${configService.get('APP_NAME')}`);
}
bootstrap();
