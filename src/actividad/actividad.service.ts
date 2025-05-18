/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadEntity } from './actividad.entity';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(ActividadEntity)
    private readonly actividadRepository: Repository<ActividadEntity>,
  ) {}

  async crearActividad(actividad: ActividadEntity): Promise<ActividadEntity> {
    const titulo = actividad.titulo;
    const specialCharsRegex = /[^A-Za-z0-9\s]/;

    if (titulo.length < 15) {
      throw new Error('Titulo muy corto');
    }
    if (specialCharsRegex.test(titulo)) {
      throw new Error('Título con caracteres especiales');
    }

    return await this.actividadRepository.save(actividad);
  }

  async cambiarEstado(
    actividadID: string,
    estado: number,
  ): Promise<ActividadEntity> {
    const actividad = await this.actividadRepository.findOne({
      where: { id: actividadID },
      relations: ['estudiantes'],
    });
    if (!actividad) {
      throw new Error('Actividad no encontrada');
    }

    if (![0, 1, 2].includes(estado)) {
      throw new Error('Estado inválido');
    }

    if (estado === 1) {
      const porcentaje = actividad.estudiantes.length / actividad.cupoMax;
      if (porcentaje < 0.8) {
        throw new Error(
          'La actividad solo puede cerrarse si al menos el 80% del cupo está lleno',
        );
      }
    }

    if (estado === 2) {
      if (actividad.estudiantes.length < actividad.cupoMax) {
        throw new Error(
          'La actividad solo puede finalizarse si no hay cupo disponible',
        );
      }
    }

    actividad.estado = estado;
    return await this.actividadRepository.save(actividad);
  }

  async findAllActividadesByDate(fecha: string): Promise<ActividadEntity[]> {
    return await this.actividadRepository.find({
      where: { fecha },
    });
  }
}
