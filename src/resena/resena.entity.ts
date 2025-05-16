/* eslint-disable prettier/prettier */
import { ActividadEntity } from 'src/actividad/actividad.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResenaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comentario: string;

  @Column()
  fecha: string;

  @Column()
  calificacion: number;


  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.resenas)
  estudiante: EstudianteEntity;

  @ManyToOne(() => ActividadEntity, (actividad) => actividad.resenas)
  actividad: ActividadEntity;
}
