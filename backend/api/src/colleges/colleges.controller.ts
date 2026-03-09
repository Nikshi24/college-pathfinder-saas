import { Controller, Get, Post, Body } from '@nestjs/common';
import { CollegesService } from './colleges.service';
import { CreateCollegeDto } from './dto/create-college.dto';
import { Param, ParseIntPipe } from '@nestjs/common';
@Controller('colleges')
export class CollegesController {
  constructor(private collegesService: CollegesService) {}

  @Get()
  async findAll() {
    return this.collegesService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collegesService.findOne(id);
  }
  @Post()
  async create(@Body() data: CreateCollegeDto) {
    return this.collegesService.create(data);
}
}
