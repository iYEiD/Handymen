import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { UserModule } from 'src/user/user.module';
import { ServiceModule } from 'src/service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UserModule, ServiceModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule { }
