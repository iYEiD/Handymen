import { Booking } from 'src/booking/entities/booking.entity';
import { Review } from 'src/review/entities/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[];

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];
}
