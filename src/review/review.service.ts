import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) { }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const newReview = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(newReview);
  }

  findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  findOne(id: number): Promise<Review> {
    return this.reviewRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    await this.reviewRepository.update(id, updateReviewDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const reviewToRemove = await this.findOne(id);
    if (!reviewToRemove) throw new Error('Review not found');
    await this.reviewRepository.remove(reviewToRemove);
  }
}
