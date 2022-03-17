import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Headers,
  UseGuards, Inject, Logger
} from '@nestjs/common';
import {AuthGuard, UserData} from 'src/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import {Roles} from "../roles.decorator";
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('users')
export class UsersController {

  private readonly loggers = new Logger(UsersController.name);

  constructor(
      private authService: AuthService,
      private usersService: UsersService,
      @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger
  ) { }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post('/set/meta')
  @Roles('admin')
  create(@Body() createUserDto: CreateUserDto) {
    this.loggers.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    const { name, email, password } = createUserDto;
    this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;

    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;

    return await this.usersService.login(email, password);
  }

  // authGuard로 jwt 비교
  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(@Headers() headers: any, @Param('id') userId: string): Promise<UserInfo> {
    // authGuard로 jwt 비교하면 아래로직 주석처리
    // const jwtString = headers.authorization.split('SeCrEtKeYfOrHaShInG ')[1];
    //
    // this.authService.verify(jwtString);

    return this.usersService.getUserInfo(userId);
  }
  @Get('/:id/:test')
  async getFindPaging(@Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset:number, @UserData("name")name:string): Promise<UserInfo> {
    return await this.usersService.getUserInfo("");
  }
  @Post('/repository')
  async getUserId(@UserData('id') id:string): Promise<UserInfo> {
    this.loggers.log("~~~~~~~~~~~~~~~~~~~~~~###~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    /*this.logger.error('error: ', id);
    this.logger.warn('warn: ', id);
    this.logger.info('info: ', id);
    this.logger.http('http: ', id);
    this.logger.verbose('verbose: ', id);
    this.logger.debug('debug: ', id);
    this.logger.silly('silly: ', id);*/
    this.loggers.log("id : ", id);

    return await this.usersService.findOneByUserId(id);
  }
}
