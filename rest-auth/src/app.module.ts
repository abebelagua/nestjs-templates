import { Module } from '@nestjs/common';

import { configModule } from './config';

import { UserModule } from './features/user';
import { AuthModule } from './features/auth';

import { HealthController } from './health.controller';

@Module({
	imports: [configModule, UserModule, AuthModule],
	controllers: [HealthController],
	providers: [],
})
export class AppModule {}
