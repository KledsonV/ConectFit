import { Module } from '@nestjs/common';
import { PhysicalAssessmentService } from './physical-assessment.service';
import { PhysicalAssessmentController } from './physical-assessment.controller';
import { PhysicalAssessment } from './entities/physical-assessment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhysicalAssessment])],
  providers: [PhysicalAssessmentService],
  controllers: [PhysicalAssessmentController],
})
export class PhysicalAssessmentModule {}
