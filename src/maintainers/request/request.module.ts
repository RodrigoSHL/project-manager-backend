import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectModule } from '../project/project.module';

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [TypeOrmModule.forFeature([Request]), AuthModule, ProjectModule],
})
export class RequestModule {}
