import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Service } from 'src/service/entities/service.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column()
    comments: string;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @ManyToOne(() => Service, (service) => service.reviews)
    service: Service;
}
