import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Req,
  UseGuards
} from '@nestjs/common';

import { SavedCollegesService } from './saved-colleges.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('saved-colleges')
export class SavedCollegesController {

  constructor(private savedService: SavedCollegesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async save(@Req() req: any, @Body() body: any) {

    const userId = req.user.userId;

    return this.savedService.saveCollege(
      userId,
      body.collegeId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSaved(@Req() req: any) {

    const userId = req.user.userId;

    return this.savedService.getSavedColleges(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.savedService.removeSavedCollege(Number(id));
  }

}