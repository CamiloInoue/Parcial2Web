/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResenaEntity } from './resena.entity';
import { ResenaController } from './resena.controller';

@Module({
  providers: [ResenaService],
  imports: [TypeOrmModule.forFeature([ResenaEntity])],
  controllers: [ResenaController],
})
export class ResenaModule {}
