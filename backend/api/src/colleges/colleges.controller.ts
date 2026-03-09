import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe
} from '@nestjs/common';

import { CollegesService } from './colleges.service';
import { CreateCollegeDto } from './dto/create-college.dto';

@Controller('colleges')
export class CollegesController {

  constructor(private collegesService: CollegesService) {}

  // GET /colleges (with filtering + pagination)
  @Get()
  async findAll(@Query() query: any) {
    return this.collegesService.findAll(query);
  }

  // GET /colleges/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collegesService.findOne(id);
  }

  // POST /colleges
  @Post()
  async create(@Body() data: CreateCollegeDto) {
    return this.collegesService.create(data);
  }

  // PATCH /colleges/:id
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any
  ) {
    return this.collegesService.update(id, data);
  }

  // DELETE /colleges/:id
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.collegesService.remove(id);
  }

}