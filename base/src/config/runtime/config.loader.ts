import { getAppVersion } from '../../utils';

import { createConfigLoader } from '../config-loader.factory';

import { RuntimeConfig, CONFIG_KEY_RUNTIME } from './config.contracts';

export const loadRuntimeConfig = createConfigLoader<RuntimeConfig>(
	CONFIG_KEY_RUNTIME,
	[
		// General
		'APP_ENV',
		'APP_NAME',
		'API_URL',
		'SERVER_PORT',
		// Logging
		'LOG_LEVEL',
	],
	() => ({
		APP_VERSION: getAppVersion(),
	}),
);
