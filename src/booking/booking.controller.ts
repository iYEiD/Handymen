import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get('user/:userId')
  findAllForUser(@Param('userId') userId: string) {
    return this.bookingService.findAllForUser(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Get(':bookingId/user/:userId')
  findOneForUser(@Param('userId') userId: string, @Param('bookingId') bookingId: string) {
    return this.bookingService.findOneForUser(+userId, +bookingId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }


  @Delete(':bookingId/user/:userId')
  removeForUser(@Param('bookingId') bookingId: string, @Param('userId') userId: string) {
    return this.bookingService.removeForUser(+bookingId, +userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }

}
