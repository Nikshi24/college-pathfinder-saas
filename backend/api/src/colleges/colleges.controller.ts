import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';

import { CollegesService } from './colleges.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('colleges')
export class CollegesController {

  constructor(private collegesService: CollegesService) {}

  // Public: GET /colleges
  @Get()
  async findAll(@Query() query: any) {
    return this.collegesService.findAll(query);
  }

  // Public: GET /colleges/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collegesService.findOne(id);
  }

  // Protected: POST /colleges
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateCollegeDto) {
    return this.collegesService.create(data);
  }

  // Protected: PATCH /colleges/:id
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any
  ) {
    return this.collegesService.update(id, data);
  }

  // Protected: DELETE /colleges/:id
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.collegesService.remove(id);
  }

}