import { ConfigFactory, registerAs } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { merge, pick } from 'lodash';
import { DotenvParseOutput } from 'dotenv';

import { dropUndefined } from '../utils';

import { AdditionalConfigLoader } from './runtime/config.contracts';

export function createConfigLoader<TConfig>(
	key: string,
	fields: Array<keyof TConfig>,
	loadAdditionalConfig: AdditionalConfigLoader<TConfig> = () => ({}),
): ConfigFactory {
	type ConfigEnv = TConfig & DotenvParseOutput;

	const logger = new Logger(`${key}ConfigLoader`);

	function fromEnv(env: any = process.env) {
		const config = pick(env, fields);
		return dropUndefined(config);
	}

	return registerAs(key, () => {
		const configFromEnv = fromEnv();

		const baseConfig = merge(configFromEnv);

		const configFromAdditional = loadAdditionalConfig(baseConfig);
		const config = merge(baseConfig, configFromAdditional);

		logger.log(`Loaded config for ${key} feature`);
		logger.verbose(
			`Keys: ${Object.keys(dropUndefined(config)).join(', ')}`,
		);

		return config;
	});
}
