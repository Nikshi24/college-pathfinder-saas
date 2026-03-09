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

  // GET /colleges with filters + pagination
  @Get()
  async findAll(@Query() query: any) {
    return this.collegesService.findAll(query);
  }

  // GET /colleges/compare?ids=1,2,3
  @Get('compare')
  async compare(@Query('ids') ids: string) {

    const idArray = ids.split(',').map(id => Number(id));

    return this.collegesService.compare(idArray);
  }

  // GET /colleges/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collegesService.findOne(id);
  }

  // POST /colleges
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateCollegeDto) {
    return this.collegesService.create(data);
  }

  // PATCH /colleges/:id
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any
  ) {
    return this.collegesService.update(id, data);
  }

  // DELETE /colleges/:id
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.collegesService.remove(id);
  }

}