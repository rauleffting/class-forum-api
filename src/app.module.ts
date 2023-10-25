import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  // module brings together everything that is inside the app
  controllers: [CreateAccountController],
  providers: [PrismaService], // everything which is not a controller is a provider on nest
})
export class AppModule {}
