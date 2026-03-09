import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

  async register(data: any) {

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword
      }
    });

    return {
      message: 'User registered successfully',
      userId: user.id
    };
  }

  async login(data: any) {

    const user = await this.prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

}