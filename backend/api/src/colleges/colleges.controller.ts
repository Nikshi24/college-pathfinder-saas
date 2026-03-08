import { Controller, Get } from '@nestjs/common';

@Controller('colleges')
export class CollegesController {

  @Get()
  findAll() {
    return [
      { id: 1, name: "IIT Bombay", location: "Mumbai" },
      { id: 2, name: "IIT Delhi", location: "Delhi" },
      { id: 3, name: "NIT Trichy", location: "Tamil Nadu" }
    ];
  }

}