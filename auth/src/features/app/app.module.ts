import { Module } from '@nestjs/common';

import { configModule } from '../../config/config.module';

import { AppController, HealthController } from './controllers';
import { AppService } from './services';

@Module({
	imports: [configModule],
	controllers: [AppController, HealthController],
	providers: [AppService],
})
export class AppModule {}
