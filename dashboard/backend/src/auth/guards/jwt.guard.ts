import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Guards } from 'auth/common/guards';

@Injectable()
export class JwtAuthGuard extends AuthGuard(Guards.Jwt) {}
