/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResenaEntity } from './resena.entity';
import { ActividadEntity } from 'src/actividad/actividad.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class ResenaService {
     constructor(
       @InjectRepository(ResenaEntity)
        private readonly resenaRepository: Repository<ResenaEntity>,
        @InjectRepository(ActividadEntity)
        private readonly actividadRepository: Repository<ActividadEntity>,
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,
    
   ){}

    async agregarResena(resena: ResenaEntity): Promise<ResenaEntity> {
        const actividad = await this.actividadRepository.findOne({
            where: { id: resena.actividad.id },
            relations: ['estudiantes'],
        });
        if (!actividad) {
            throw new BusinessLogicException('Actividad no encontrada', BusinessError.NOT_FOUND);
        }

        if (actividad.estado === 0) {
            throw new BusinessLogicException('La actividad no está finalizada', BusinessError.PRECONDITION_FAILED);
        }

        const inscrito = actividad.estudiantes.some(e => e.id === resena.estudiante.id);
        if (!inscrito) {
            throw new BusinessLogicException('El estudiante no estuvo inscrito en la actividad', BusinessError.PRECONDITION_FAILED);
        }

        return await this.resenaRepository.save(resena);
    }
}
