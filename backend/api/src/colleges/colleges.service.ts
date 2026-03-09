import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CollegesService {

  prisma = new PrismaClient();

  async findAll(query: any) {

    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 20;

    const filters: any = {};

    if (query.location) {
      filters.location = {
        contains: query.location,
        mode: 'insensitive'
      };
    }

    if (query.maxFees) {
      filters.fees = {
        lte: Number(query.maxFees)
      };
    }

    if (query.ranking) {
      filters.ranking = {
        lte: Number(query.ranking)
      };
    }

    const colleges = await this.prisma.college.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: limit
    });

    const total = await this.prisma.college.count({
      where: filters
    });

    return {
      page,
      limit,
      total,
      data: colleges
    };
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

  async update(id: number, data: any) {

    return this.prisma.college.update({
      where: { id },
      data
    });

  }

  async remove(id: number) {

    return this.prisma.college.delete({
      where: { id }
    });

  }

  async compare(ids: number[]) {

    return this.prisma.college.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });

  }

}