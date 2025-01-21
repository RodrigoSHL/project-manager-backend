import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/maintainers/project/entities/project.entity';
import { Request } from 'src/maintainers/request/entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  // Crear una solicitud (request)
  async create(
    createRequestDto: CreateRequestDto,
    user: User,
  ): Promise<Request> {
    const { projectId, assignedToId } = createRequestDto;

    // Buscar el proyecto asociado
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID "${projectId}" not found`);
    }

    // Crear una nueva solicitud
    const newRequest = this.requestRepository.create({
      ...createRequestDto,
      project,
      createdBy: user,
      assignedTo: assignedToId ? ({ id: assignedToId } as User) : null, // Relación con el asignado
    });

    return this.requestRepository.save(newRequest);
  }

  // Obtener todas las solicitudes
  async findAll(): Promise<Request[]> {
    return this.requestRepository.find({
      relations: ['project', 'createdBy', 'assignedTo'], // Cargar relaciones
    });
  }

  // Obtener solicitudes por proyecto
  async findByProject(projectId: string): Promise<Request[]> {
    return this.requestRepository.find({
      where: { project: { id: projectId } },
      relations: ['createdBy', 'assignedTo'], // Cargar relaciones
    });
  }

  // Obtener una solicitud por ID
  async findOne(id: string): Promise<Request> {
    const request = await this.requestRepository.findOne({
      where: { id },
      relations: ['project', 'createdBy', 'assignedTo'], // Cargar relaciones
    });

    if (!request) {
      throw new NotFoundException(`Request with ID "${id}" not found`);
    }

    return request;
  }

  // Actualizar una solicitud
  async update(
    id: string,
    updateRequestDto: Partial<Request>,
  ): Promise<Request> {
    const request = await this.findOne(id);

    Object.assign(request, updateRequestDto);
    return this.requestRepository.save(request);
  }

  // Eliminar una solicitud
  async remove(id: string): Promise<void> {
    const request = await this.findOne(id);
    await this.requestRepository.remove(request);
  }
}
