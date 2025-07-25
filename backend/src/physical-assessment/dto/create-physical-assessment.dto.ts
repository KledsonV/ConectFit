import {
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePhysicalAssessmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  studentName: string;

  @IsDateString()
  assessmentDate: Date;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsEnum(['Male', 'Female', 'Other'])
  gender?: 'Male' | 'Female' | 'Other';

  @IsOptional()
  @IsDecimal()
  weight?: number;

  @IsOptional()
  @IsDecimal()
  height?: number;

  @IsOptional()
  @IsDecimal()
  bmi?: number;

  @IsOptional()
  @IsDecimal()
  bodyFatPercentage?: number;

  @IsOptional()
  @IsDecimal()
  leanMass?: number;

  @IsOptional()
  @IsDecimal()
  waistCircumference?: number;

  @IsOptional()
  @IsDecimal()
  chestCircumference?: number;

  @IsOptional()
  @IsDecimal()
  armCircumference?: number;

  @IsOptional()
  @IsDecimal()
  thighCircumference?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
