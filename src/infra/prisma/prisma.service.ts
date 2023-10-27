import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['warn', 'error'], // displays warns and errors from prisma
    })
  }

  // called when PrismaService instantiated
  onModuleInit() {
    return this.$connect() // to connect with prisma
  }

  // called when PrismaService is destroyed
  onModuleDestroy() {
    return this.$disconnect() // to disconnect with prisma
  }
}
