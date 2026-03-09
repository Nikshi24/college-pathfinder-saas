import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CollegesService {

  prisma = new PrismaClient();

  // GET /colleges with filtering + pagination
  async findAll(query: any) {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filters: any = {};

    if (query.location) {
      filters.location = query.location;
    }

    if (query.maxFees) {
      filters.fees = {
        lte: Number(query.maxFees)
      };
    }

    return this.prisma.college.findMany({
      where: filters,
      skip: skip,
      take: limit
    });
  }

  // GET /colleges/:id
  async findOne(id: number) {
    return this.prisma.college.findUnique({
      where: { id }
    });
  }

  // POST /colleges
  async create(data: any) {
    return this.prisma.college.create({
      data
    });
  }

  // PATCH /colleges/:id
  async update(id: number, data: any) {
    return this.prisma.college.update({
      where: { id },
      data
    });
  }

  // DELETE /colleges/:id
  async remove(id: number) {
    return this.prisma.college.delete({
      where: { id }
    });
  }
}