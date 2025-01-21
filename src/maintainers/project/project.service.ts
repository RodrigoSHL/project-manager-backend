import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear un proyecto
  async create(
    createProjectDto: CreateProjectDto,
    user: User,
  ): Promise<Project> {
    const newProject = this.projectRepository.create({
      ...createProjectDto,
      createdBy: user, // Relaciona el creador del proyecto
    });
    return this.projectRepository.save(newProject);
  }

  // Obtener todos los proyectos
  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['createdBy', 'members', 'requests'], // Relaciona con usuarios y solicitudes
    });
  }

  // Obtener un proyecto por ID
  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['createdBy', 'members', 'requests'], // Relaciona con usuarios y solicitudes
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

  // Actualizar un proyecto
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOne(id);

    Object.assign(project, updateProjectDto);
    return this.projectRepository.save(project);
  }

  // Eliminar un proyecto
  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  async addUsersToProject(
    projectId: string,
    userIds: string[],
  ): Promise<Project> {
    // Buscar el proyecto
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['members'], // Carga los miembros actuales
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${projectId}" not found`);
    }

    // Validar que los usuarios existen
    const users = await this.userRepository.findByIds(userIds);
    if (users.length !== userIds.length) {
      throw new NotFoundException(`One or more users not found`);
    }

    // Agregar los nuevos usuarios al proyecto
    project.members = [...project.members, ...users]; // Combina usuarios actuales y nuevos
    return this.projectRepository.save(project);
  }
}
