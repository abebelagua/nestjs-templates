import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import {
	loadRuntimeConfig,
	CONFIG_KEY_RUNTIME,
	runtimeConfigSchema,
} from './runtime';
import { authConfigSchema, CONFIG_KEY_AUTH, loadAuthConfig } from './auth';

import { AppConfig } from './app-config.contract';

export const configModule = ConfigModule.forRoot({
	isGlobal: true,
	cache: true,
	ignoreEnvFile: false,
	expandVariables: true,
	load: [loadRuntimeConfig, loadAuthConfig],
	validationSchema: Joi.object<AppConfig>({
		[CONFIG_KEY_RUNTIME]: runtimeConfigSchema,
		[CONFIG_KEY_AUTH]: authConfigSchema,
		// add other config schemas here
	}),
});
