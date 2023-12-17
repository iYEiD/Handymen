import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BookingService {

  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) { }

  async create(createBookingDto: CreateBookingDto) {
    const user = (await this.userRepository.find({ where: { id: createBookingDto.userId } }))[0];
    const service = (await this.serviceRepository.find({ where: { id: createBookingDto.serviceId } }))[0];

    if (!user || !service) {
      throw new Error('User or Service not found');
    }

    const newBooking = this.bookingRepository.create({
      date: createBookingDto.date,
      status: createBookingDto.status,
      user: user,
      service: service,
    });

    return this.bookingRepository.save(newBooking);

  }

  findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  findAllForUser(userId: number): Promise<Booking[]> {
    return this.bookingRepository.find({ where: { user: { id: userId } } });
  }

  findOne(id: number): Promise<Booking> {
    return this.bookingRepository.findOne({ where: { id: id } });
  }

  findOneForUser(userId: number, bookingId: number): Promise<Booking> {
    return this.bookingRepository.findOne({ where: { user: { id: userId }, id: bookingId } });
  }


  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const bookingToUpdate = await this.findOne(id);
    if (!bookingToUpdate) throw new Error('Booking not found');
    return this.bookingRepository.save({ ...bookingToUpdate, ...updateBookingDto });
  }

  async remove(id: number): Promise<void> {
    const bookingToRemove = await this.findOne(id);
    if (!bookingToRemove) throw new Error('Booking not found');
    await this.bookingRepository.remove(bookingToRemove);
  }
}
