import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from './service/service.module';
import { BookingModule } from './booking/booking.module';
import { ReviewModule } from './review/review.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'handyman',
    autoLoadEntities: true,
    synchronize: true,
  }), UserModule, ServiceModule, BookingModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
