import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    if (dto.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (emailExists) {
        throw new ForbiddenException('Credentials taken');
      }
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });

    delete user.hash;

    return user;
  }
}
