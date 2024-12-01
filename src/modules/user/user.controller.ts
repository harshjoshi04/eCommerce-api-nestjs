import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDTOEntity, SignUpDTOEntity } from 'src/dto/user.dto';
import { Response } from 'express';
import { ResponseEntity } from 'src/interface/server.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('sign-up')
  async signUp(
    @Res() res: Response,
    @Body() user: SignUpDTOEntity,
  ): Promise<any> {
    const result: ResponseEntity = await this.userService.signUp(user);
    res.status(result.statusCode).json(result);
  }

  @Post('sign-in')
  async signIn(@Res() res: Response, @Body() data: SignInDTOEntity): Promise<void> {
    const result: ResponseEntity = await this.userService.signIn(data);
    res.status(result.statusCode).json(result);
  }
}
