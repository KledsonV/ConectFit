// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PhysicalAssessmentModule } from './physical-assessment/physical-assessment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 32768,
      username: 'root',
      password: 'root',
      database: 'backend',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // só em dev! (cria tabelas automaticamente)
    }),
    AuthModule,
    PhysicalAssessmentModule,
  ],
})
export class AppModule {}
