import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import emailConfig from './config/emailConfig';
import authConfig from './config/authConfig';
import { validationSchema } from './config/validationSchema';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggerMiddleware2 } from './logger/logger.middleware2';
import {UsersController} from "./users/users.controller";

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    /*TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST, // 'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME, // 'root',
      password: process.env.DATABASE_PASSWORD, // 'test',
      database: 'test',
      entities: ['dist/!**!/!*.entity{.ts,.js}'],
      //synchronize 옵션을 true로 하면 서비스가 실행되고 데이터베이스가 연결될 때 항상 데이터베이스가 초기화 되므로 절대 프로덕션에는 true로 하지 마세요!
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE), // true,
    }),*/

    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer):any{
    consumer
      .apply(LoggerMiddleware, LoggerMiddleware2)
      .forRoutes(UsersController);
  }
}