import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('health')
export class HealthController {
	constructor(private readonly appService: AppService) {}

	@Get()
	health(): boolean {
		return true;
	}
}
