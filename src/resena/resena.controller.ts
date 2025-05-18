/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { ResenaEntity } from './resena.entity';

@Controller('resenas')
export class ResenaController {
  constructor(private readonly resenaService: ResenaService) {}

  @Post()
  async agregarResena(@Body() resena: ResenaEntity): Promise<ResenaEntity> {
    return this.resenaService.agregarResena(resena);
  }
}