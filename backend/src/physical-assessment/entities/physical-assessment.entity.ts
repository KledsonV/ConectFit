import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('assessments')
export class PhysicalAssessment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  studentName: string;

  @Column({ type: 'date' })
  assessmentDate: Date;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'enum', enum: ['Male', 'Female', 'Other'], nullable: true })
  gender: 'Male' | 'Female' | 'Other';

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  height: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  bmi: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  bodyFatPercentage: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  leanMass: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  waistCircumference: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  chestCircumference: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  armCircumference: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  thighCircumference: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
