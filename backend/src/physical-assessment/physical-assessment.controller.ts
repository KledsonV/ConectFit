import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PhysicalAssessmentService } from './physical-assessment.service';
import { CreatePhysicalAssessmentDto } from './dto/create-physical-assessment.dto';

@Controller('assessments')
export class PhysicalAssessmentController {
  constructor(private readonly service: PhysicalAssessmentService) {}

  @Post()
  create(@Body() dto: CreatePhysicalAssessmentDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreatePhysicalAssessmentDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
