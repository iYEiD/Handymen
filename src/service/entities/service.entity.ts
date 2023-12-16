import { Booking } from 'src/booking/entities/booking.entity';
import { Review } from 'src/review/entities/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @OneToMany(() => Booking, (booking) => booking.service)
    bookings: Booking[];

    @OneToMany(() => Review, (review) => review.service)
    reviews: Review[];
}
