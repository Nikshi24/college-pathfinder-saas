import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('recommendations')
export class RecommendationsController {

  constructor(private recommendationsService: RecommendationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getRecommendations(@Req() req: any) {

    const userId = req.user.userId;

    return this.recommendationsService.getRecommendations(userId);
  }

}