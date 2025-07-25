import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20, nullable: false })
  telephone: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Column()
  neighborhood: string;

  @Column({ type: 'date', nullable: true })
  birthdate: string;

  @Column({ nullable: true })
  cref?: string;

  registrationDate: Date;
}
