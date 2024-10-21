import { CONFIG_KEY_RUNTIME, RuntimeConfig } from './runtime';
import { AuthConfig, CONFIG_KEY_AUTH } from './auth';

export interface AppConfig {
	[CONFIG_KEY_RUNTIME]: RuntimeConfig;
	[CONFIG_KEY_AUTH]: AuthConfig;
	// add other config contracts here
}
