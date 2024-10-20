import { CONFIG_KEY_RUNTIME, RuntimeConfig } from './runtime/config.contracts';

export interface AppConfig {
	[CONFIG_KEY_RUNTIME]: RuntimeConfig;
}
