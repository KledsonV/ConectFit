import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhysicalAssessment } from './entities/physical-assessment.entity';
import { CreatePhysicalAssessmentDto } from './dto/create-physical-assessment.dto';

@Injectable()
export class PhysicalAssessmentService {
  constructor(
    @InjectRepository(PhysicalAssessment)
    private readonly repo: Repository<PhysicalAssessment>,
  ) {}

  async create(dto: CreatePhysicalAssessmentDto) {
    const assessment = this.repo.create(dto);
    return this.repo.save(assessment);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const assessment = await this.repo.findOneBy({ id });
    if (!assessment) throw new NotFoundException('Assessment not found');
    return assessment;
  }

  async update(id: number, dto: CreatePhysicalAssessmentDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: number) {
    const assessment = await this.findOne(id);
    return this.repo.remove(assessment);
  }
}
