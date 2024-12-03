import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProvider } from 'src/models/user.schema';
import { DatabaseModule } from 'src/config/db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...UserProvider],
  exports: [UserService],
})
export class UserModule {}
