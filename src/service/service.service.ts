import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { find } from 'rxjs';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) { }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(newService);
  }

  findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  findOne(id: number): Promise<Service> {
    return this.serviceRepository.findOne({ where: { id: id } });
  };


  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
    await this.serviceRepository.update(id, updateServiceDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const serviceToRemove = await this.findOne(id);
    await this.serviceRepository.remove(serviceToRemove);

  }
}
