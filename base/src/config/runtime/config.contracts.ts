import * as Joi from 'joi';
import { SchemaMap } from 'joi';

import {
	AppEnvironment,
	APP_ENVIRONMENTS,
	ENV_LOCAL,
	LogLevel,
	LOG_DEBUG,
	LOG_ERROR,
	LOG_LEVELS,
	LOG_VERBOSE,
	LOG_WARN,
} from './constants';

/**
 * The property path to load runtime config on the global config object.
 */
export const CONFIG_KEY_RUNTIME = 'runtime';

export const DEFAULT_PORT = 4000;

const levelsList = LOG_LEVELS.join(', ');
const msg = `Invalid log level, please specify one of: ${levelsList}. Default is ERROR.`;

export type AdditionalConfigLoader<TConfig> = (
	env: Record<string, any>,
) => Partial<TConfig>;

/**
 * General config options
 */
export interface RuntimeConfig {
	// general
	APP_ENV: AppEnvironment;
	APP_NAME: string;
	APP_VERSION: string;
	API_URL: string;
	SERVER_PORT: number | string;
	// logging
	LOG_LEVEL: LogLevel;
}

export const runtimeConfigSchema: SchemaMap<RuntimeConfig> = {
	// general
	APP_ENV: Joi.string()
		.valid(...APP_ENVIRONMENTS)
		.default(ENV_LOCAL),
	APP_NAME: Joi.string().default('API'),
	APP_VERSION: Joi.string().pattern(/^v?\d+(\.\d+){2}(-\w+)?$/),
	API_URL: Joi.string()
		.pattern(/^https?:\/\/\w+(\.\w+){2}$/)
		.default(`http://localhost:${DEFAULT_PORT}`),
	SERVER_PORT: Joi.number().default(DEFAULT_PORT),
	// logging
	LOG_LEVEL: Joi.string()
		.valid(LOG_ERROR, LOG_WARN, LOG_DEBUG, LOG_VERBOSE)
		.default(LOG_ERROR)
		.messages({ msg }),
};
