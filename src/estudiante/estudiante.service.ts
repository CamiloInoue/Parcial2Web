/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { ActividadEntity } from 'src/actividad/actividad.entity';

@Injectable()
export class EstudianteService {
     constructor(
       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>,
       @InjectRepository(ActividadEntity)
        private readonly actividadRepository: Repository<ActividadEntity>,
   ){}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {

        const correo = estudiante.correo;
        const semestre = estudiante.semestre;
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!regex.test(correo)){
            throw new Error("El correo no es válido")
        }

        if (semestre <= 1 || semestre >= 10){
            throw new Error("El semestre no es válido")
        }

       return await this.estudianteRepository.save(estudiante);
   }

     async findEstudianteById(id: string): Promise<EstudianteEntity> {
       const estudiante = await this.estudianteRepository.findOne({where: {id}, relations: ["actividades", "resenas"] } );
       if (!estudiante)
         throw new BusinessLogicException("El estudiante con el id dado no se encontró", BusinessError.NOT_FOUND);
  
       return estudiante;
   }

 
   async inscribirseActividad(estudianteID: string, actividadID: string): Promise<void> {
        const estudiante = await this.estudianteRepository.findOne({
            where: { id: estudianteID },
            relations: ['actividades'],
        });
        if (!estudiante) {
            throw new BusinessLogicException('Estudiante no encontrado', BusinessError.NOT_FOUND);
        }

        const actividad = await this.actividadRepository.findOne({
            where: { id: actividadID },
            relations: ['estudiantes'],
        });
        if (!actividad) {
            throw new BusinessLogicException('Actividad no encontrada', BusinessError.NOT_FOUND);
        }

        if (actividad.estado !== 0) {
            throw new BusinessLogicException('La actividad no está disponible para inscripción', BusinessError.PRECONDITION_FAILED);
        }

        if (actividad.estudiantes.length >= actividad.cupoMax) {
            throw new BusinessLogicException('No hay cupo disponible en la actividad', BusinessError.PRECONDITION_FAILED);
        }

        if (actividad.estudiantes.some(e => e.id === estudianteID)) {
            throw new BusinessLogicException('El estudiante ya está inscrito en la actividad', BusinessError.PRECONDITION_FAILED);
        }

        actividad.estudiantes.push(estudiante);
        await this.actividadRepository.save(actividad);
    }
}
