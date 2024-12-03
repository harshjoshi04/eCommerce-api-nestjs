import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { SignInDTOEntity, SignUpDTOEntity } from 'src/dto/user.dto';
import { ResponseEntity } from 'src/interface/server.interface';
import { UserSchemaEntity } from 'src/interface/user.interface';
import { DatabaseProvider } from 'src/lib/databaseProviderEnum';
import { MESSAGE } from 'src/lib/enum';
import {
  comparePassword,
  HashPassword,
  isNullOrUndefined,
} from 'src/lib/shared';

@Injectable()
export class UserService {
  constructor(
    @Inject(DatabaseProvider.USER) private userModel: Model<UserSchemaEntity>,
    private jwtService: JwtService,
  ) {}

  async signUp(user: SignUpDTOEntity): Promise<ResponseEntity> {
    try {
      // verify if user email exists or not
      const isMatch = await this.userModel.findOne({ email: user.email });
      if (!isNullOrUndefined(isMatch)) {
        return {
          data: {},
          message: MESSAGE.emailexists,
          status: false,
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
      const hashPassword = await HashPassword(user.password);
      user.password = hashPassword;
      const data = await this.userModel.create(user);
      const token = this.jwtService.sign({ id: data._id });
      return {
        data: { token },
        message: MESSAGE.userCreate,
        status: true,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      return {
        data: {},
        message: MESSAGE.internalServer,
        status: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async signIn(data: SignInDTOEntity): Promise<ResponseEntity> {
    try {
      const user: UserSchemaEntity = await this.userModel.findOne({
        email: data.email,
      });
      if (isNullOrUndefined(user)) {
        return {
          data: {},
          message: MESSAGE.loginFailed,
          status: false,
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
      const isMatch = await comparePassword(data.password, user.password);
      if (!isMatch) {
        return {
          data: {},
          message: MESSAGE.loginFailed,
          status: false,
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
      let { password, ...result } = JSON.parse(JSON.stringify(user));
      const token = this.jwtService.sign({ id: result._id });
      return {
        data: { user: result, token },
        message: MESSAGE.userLogin,
        status: true,
        statusCode: HttpStatus.OK,
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
