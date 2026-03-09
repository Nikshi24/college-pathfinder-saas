import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {

  prisma = new PrismaClient();

  async getProfile(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId }
    });
  }

  async updatePreferences(userId: number, data: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data
    });
  }

}