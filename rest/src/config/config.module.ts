import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import {
	loadRuntimeConfig,
	CONFIG_KEY_RUNTIME,
	runtimeConfigSchema,
} from './runtime';

import { AppConfig } from './app-config.contract';

export const configModule = ConfigModule.forRoot({
	isGlobal: true,
	cache: true,
	ignoreEnvFile: false,
	expandVariables: true,
	load: [loadRuntimeConfig],
	validationSchema: Joi.object<AppConfig>({
		[CONFIG_KEY_RUNTIME]: runtimeConfigSchema,
		// add other config schemas here
	}),
});
