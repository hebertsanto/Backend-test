import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HealthcheckService } from '../services/healthcheck.service';
import { SkipAuth } from 'src/modules/auth/skip-auth.decorator';

@ApiTags('Health')
@Controller()
export class HealthcheckController {
  constructor(private readonly healthService: HealthcheckService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return health of the project',
  })
  @SkipAuth()
  @Get('/health')
  async health(@Res() res: Response) {
    const status = this.healthService.status({
      code: HttpStatus.OK,
      message: 'Up',
      date: new Date(),
    });
    return res.status(HttpStatus.OK).json(status);
  }
}
