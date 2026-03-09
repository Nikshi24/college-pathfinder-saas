import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RecommendationsService {

  prisma = new PrismaClient();

  private cosineSimilarity(a: number[], b: number[]) {

    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);

    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }

    return dotProduct / (magnitudeA * magnitudeB);
  }

  private collegeVector(college: any) {

    return [
      college.ranking ? 1 / college.ranking : 0,
      college.fees ? 1 / college.fees : 0,
      college.location ? college.location.length : 0
    ];

  }

  private userVector(user: any) {

    return [
      user.targetRanking ? 1 / user.targetRanking : 0,
      user.maxFees ? 1 / user.maxFees : 0,
      user.preferredLocation ? user.preferredLocation.length : 0
    ];

  }

  async getRecommendations(userId: number) {

    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const colleges = await this.prisma.college.findMany();

    const uVec = this.userVector(user);

    const scored = colleges.map(college => {

      const cVec = this.collegeVector(college);

      const similarity = this.cosineSimilarity(uVec, cVec);

      let reason = 'Recommended based on your preferences';

      if (user.preferredLocation && college.location === user.preferredLocation) {
        reason = 'Matches your preferred location';
      }

      if (user.maxFees && college.fees && college.fees <= user.maxFees) {
        reason = 'Within your preferred fee range';
      }

      return {
        ...college,
        similarityScore: similarity,
        reason
      };

    });

    const ranked = scored.sort(
      (a, b) => b.similarityScore - a.similarityScore
    );

    return ranked.slice(0, 10);
  }

}