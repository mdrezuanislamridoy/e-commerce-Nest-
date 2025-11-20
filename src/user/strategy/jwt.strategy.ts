import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import cookieExtractor from './cookie-extractor';

interface IUser {
  id: number;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: IUser) {
    const { id } = payload;

    const user = await this.prisma.user.findMany({
      where: {
        id,
      },
    });

    if (!user) {
      throw new ForbiddenException('Please login first');
    }
    return payload;
  }
}
