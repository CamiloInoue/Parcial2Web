/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class EstudianteService {
     constructor(
       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>
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

   
}
