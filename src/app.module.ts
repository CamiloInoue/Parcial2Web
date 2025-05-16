import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ActividadModule } from './actividad/actividad.module';
import { ReseñaModule } from './reseña/reseña.module';
import { ResenaModule } from './resena/resena.module';

@Module({
  imports: [EstudianteModule, ActividadModule, ReseñaModule, ResenaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
