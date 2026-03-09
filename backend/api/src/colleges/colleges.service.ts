import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CollegesService {

  prisma = new PrismaClient();

  async findAll() {
    return this.prisma.college.findMany();
  }

  async findOne(id: number) {
    return this.prisma.college.findUnique({
      where: { id }
    });
  }

  async create(data: any) {
    return this.prisma.college.create({
      data
    });
  }

}