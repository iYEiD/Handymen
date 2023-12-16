import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    status: string;

    @ManyToOne(() => User, (user) => user.bookings)
    user: User;

    @ManyToOne(() => Service, (service) => service.bookings)
    service: Service;
}
