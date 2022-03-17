import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EmailModule } from 'src/email/email.module';
import { UserEntity } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {UserRepository} from "./repository/user.repository";

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
