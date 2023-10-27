import { AuthGuard } from '@nestjs/passport'

export class JwtAuthGuard extends AuthGuard('jwt') {} // this means that I want to use the passport-jwt strategy
