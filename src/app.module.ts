import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationMiddleware } from './middleware/authenication';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, JwtModule.register({
    global: true,
    secret: process.env.SECRET
  })],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware)
      .exclude( // middleware apply expect this route
        { path: 'sign-in', method: RequestMethod.POST },
        { path: 'sign-up', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
