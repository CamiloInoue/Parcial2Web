/* eslint-disable prettier/prettier */
import { ActividadEntity } from 'src/actividad/actividad.entity';
import { ResenaEntity } from 'src/resena/resena.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EstudianteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  programa: string;

  @Column()
  semestre: number;


  @OneToMany(() => ResenaEntity, (resena) => resena.estudiante)
  resenas: ResenaEntity[];

  @ManyToMany(() => ActividadEntity, actividad => actividad.estudiantes)
    actividades: ActividadEntity[];
}
