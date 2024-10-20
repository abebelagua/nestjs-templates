import { Module } from '@nestjs/common';

import { configModule } from '../../config/config.module';

import { UserModule } from '../user';

import { HealthController } from './controllers';

@Module({
	imports: [configModule, UserModule],
	controllers: [HealthController],
	providers: [],
})
export class AppModule {}
