import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signIn() {
    return { msg: 'Hello Sign in' };
  }

  signUp() {
    return { msg: 'Hello Sign up' };
  }
}
