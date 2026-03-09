import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SavedCollegesService {
  prisma = new PrismaClient();

  async saveCollege(userId: number, collegeId: number) {
    return this.prisma.savedCollege.create({
      data: {
        userId,
        collegeId
      }
    });
  }

  async getSavedColleges(userId: number) {
    return this.prisma.savedCollege.findMany({
      where: { userId },
      include: {
        college: true
      }
    });
  }

  async removeSavedCollege(id: number) {
    return this.prisma.savedCollege.delete({
      where: { id }
    });
  }

}