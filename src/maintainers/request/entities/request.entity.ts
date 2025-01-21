import { User } from 'src/auth/entities/user.entity';
import { Project } from 'src/maintainers/project/entities/project.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  type: 'FunctionalRequirement' | 'Support' | 'Improvement';

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { default: 'Pending' })
  status: 'Pending' | 'In Progress' | 'Completed';

  @ManyToOne(() => Project, (project) => project.requests, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @ManyToOne(() => User, { eager: true })
  createdBy: User;

  @ManyToOne(() => User, { nullable: true, eager: true })
  assignedTo: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
