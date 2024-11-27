import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDTOEntity } from 'src/dto/user.dto';
import { ResponseEntity } from 'src/interface/server.interface';
import { UserSchemaEntity } from 'src/interface/user.interface';
import { DatabaseProvider } from 'src/lib/databaseProviderEnum';
import { MESSAGE } from 'src/lib/enum';

@Injectable()
export class UserService {
  constructor(
    @Inject(DatabaseProvider.USER) private userModel: Model<UserSchemaEntity>,
  ) {}

  async signUp(user: UserDTOEntity): Promise<ResponseEntity> {
    try {
      await this.userModel.create(user);
      return {
        data: {},
        message: MESSAGE.userCreate,
        status: true,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        data: {},
        message: MESSAGE.internalServer,
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
