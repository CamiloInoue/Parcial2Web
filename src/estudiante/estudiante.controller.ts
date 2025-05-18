/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async crearEstudiante(@Body() estudiante: EstudianteEntity): Promise<EstudianteEntity> {
    return this.estudianteService.crearEstudiante(estudiante);
  }

  @Get(':id')
  async findEstudianteById(@Param('id') id: string): Promise<EstudianteEntity> {
    return this.estudianteService.findEstudianteById(id);
  }

  @Patch(':id/inscribir/:actividadId')
  async inscribirseActividad(
    @Param('id') estudianteId: string,
    @Param('actividadId') actividadId: string,
  ): Promise<void> {
    return this.estudianteService.inscribirseActividad(estudianteId, actividadId);
  }
}