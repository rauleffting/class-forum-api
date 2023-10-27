import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { UserPayload } from './jwt.strategy'

// because this decorator is not for a class but for a param
export const CurrentUser = createParamDecorator(
  // _: never is because the first parameter will never exists
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  },
)

// this decorator is to avoid using async 'handle(@Req() request: Request)' which uses req from nest and request from express
