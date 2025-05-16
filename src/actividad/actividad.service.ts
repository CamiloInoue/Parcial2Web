/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadEntity } from './actividad.entity';

@Injectable()
export class ActividadService {
     constructor(
       @InjectRepository(ActividadEntity)
       private readonly actividadRepository: Repository<ActividadEntity>
   ){}

    async crearActividad(actividad: ActividadEntity): Promise<ActividadEntity> {
        const titulo = actividad.titulo;
        const specialCharsRegex = /[^A-Za-z0-9\s]/;

        if (titulo.length < 15){
            throw new Error("Titulo muy corto")
        }
        if (specialCharsRegex.test(titulo)){
            throw new Error("Título con caracteres especiales")
        }

       return await this.actividadRepository.save(actividad);
   }
}
