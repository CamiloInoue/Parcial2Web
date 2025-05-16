/* eslint-disable prettier/prettier */
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { ResenaEntity } from 'src/resena/resena.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ActividadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  fecha: string;

  @Column()
  cupoMax: number;

  @Column()
  estado: number;

  @OneToMany(() => ResenaEntity, (resena) => resena.actividad)
  resenas: ResenaEntity[];

  @ManyToMany(() => EstudianteEntity, (estudiante) => estudiante.actividades)
  @JoinTable()
  estudiantes: EstudianteEntity[];
}
