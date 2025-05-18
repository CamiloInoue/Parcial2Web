/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { ActividadEntity } from './actividad.entity';

@Controller('actividades')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  async crearActividad(@Body() actividad: ActividadEntity): Promise<ActividadEntity> {
    return this.actividadService.crearActividad(actividad);
  }

  @Patch(':id/estado')
  async cambiarEstado(
    @Param('id') id: string,
    @Body('estado') estado: number,
  ): Promise<ActividadEntity> {
    return this.actividadService.cambiarEstado(id, estado);
  }

  @Get('fecha/:fecha')
  async findAllActividadesByDate(@Param('fecha') fecha: string): Promise<ActividadEntity[]> {
    return this.actividadService.findAllActividadesByDate(fecha);
  }
}