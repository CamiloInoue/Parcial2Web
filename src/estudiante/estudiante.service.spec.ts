/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity';
import { Repository } from 'typeorm';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let estudianteRepo: Repository<EstudianteEntity>;
  let actividadRepo: Repository<ActividadEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        { provide: getRepositoryToken(EstudianteEntity), useClass: Repository },
        { provide: getRepositoryToken(ActividadEntity), useClass: Repository },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    estudianteRepo = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    actividadRepo = module.get<Repository<ActividadEntity>>(getRepositoryToken(ActividadEntity));
  });

  describe('crearEstudiante', () => {
    it('debe crear un estudiante válido', async () => {
      const estudiante = { correo: 'test@mail.com', semestre: 5 } as EstudianteEntity;
      jest.spyOn(estudianteRepo, 'save').mockResolvedValue(estudiante);
      expect(await service.crearEstudiante(estudiante)).toEqual(estudiante);
    });

    it('debe lanzar error si el correo es inválido', async () => {
      const estudiante = { correo: 'correo-invalido', semestre: 5 } as EstudianteEntity;
      await expect(service.crearEstudiante(estudiante)).rejects.toThrow('El correo no es válido');
    });
  });
});