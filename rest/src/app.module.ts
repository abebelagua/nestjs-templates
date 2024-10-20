import { Module } from '@nestjs/common';

import { configModule } from './config';

import { UserModule } from './features/user';

import { HealthController } from './health.controller';

@Module({
	imports: [configModule, UserModule],
	controllers: [HealthController],
	providers: [],
})
export class AppModule {}
