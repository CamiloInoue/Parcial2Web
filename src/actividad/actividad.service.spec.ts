/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ActividadService } from './actividad.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity';
import { Repository } from 'typeorm';

describe('ActividadService', () => {
  let service: ActividadService;
  let repo: Repository<ActividadEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActividadService,
        {
          provide: getRepositoryToken(ActividadEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    repo = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
  });

  describe('crearActividad', () => {
    it('debe crear una actividad válida', async () => {
      const actividad = { titulo: 'Titulo de actividad válida', fecha: '2024-01-01', cupoMax: 10, estado: 0 } as ActividadEntity;
      jest.spyOn(repo, 'save').mockResolvedValue(actividad);
      expect(await service.crearActividad(actividad)).toEqual(actividad);
    });

    it('debe lanzar error si el título es muy corto', async () => {
      const actividad = { titulo: 'Corto', fecha: '2024-01-01', cupoMax: 10, estado: 0 } as ActividadEntity;
      await expect(service.crearActividad(actividad)).rejects.toThrow('Titulo muy corto');
    });
  });
});