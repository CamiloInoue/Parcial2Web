/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ResenaService } from './resena.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResenaEntity } from './resena.entity';
import { ActividadEntity } from '../actividad/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { Repository } from 'typeorm';

describe('ResenaService', () => {
  let service: ResenaService;
  let resenaRepo: Repository<ResenaEntity>;
  let actividadRepo: Repository<ActividadEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResenaService,
        { provide: getRepositoryToken(ResenaEntity), useClass: Repository },
        { provide: getRepositoryToken(ActividadEntity), useClass: Repository },
        { provide: getRepositoryToken(EstudianteEntity), useClass: Repository },
      ],
    }).compile();

    service = module.get<ResenaService>(ResenaService);
    resenaRepo = module.get<Repository<ResenaEntity>>(getRepositoryToken(ResenaEntity));
    actividadRepo = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
  });

  describe('agregarResena', () => {
    it('debe agregar una reseña si la actividad está finalizada y el estudiante estuvo inscrito', async () => {
      const actividad = { id: '1', estado: 2, estudiantes: [{ id: 'e1' }] } as ActividadEntity;
      const resena = { actividad: { id: '1' }, estudiante: { id: 'e1' } } as ResenaEntity;
      jest.spyOn(actividadRepo, 'findOne').mockResolvedValue(actividad);
      jest.spyOn(resenaRepo, 'save').mockResolvedValue(resena);
      expect(await service.agregarResena(resena)).toEqual(resena);
    });

    it('debe lanzar error si la actividad no está finalizada', async () => {
      const actividad = { id: '1', estado: 0, estudiantes: [{ id: 'e1' }] } as ActividadEntity;
      const resena = { actividad: { id: '1' }, estudiante: { id: 'e1' } } as ResenaEntity;
      jest.spyOn(actividadRepo, 'findOne').mockResolvedValue(actividad);
      await expect(service.agregarResena(resena)).rejects.toThrow('La actividad no está finalizada');
    });
  });
});