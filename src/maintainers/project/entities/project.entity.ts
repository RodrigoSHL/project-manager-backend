import { User } from 'src/auth/entities/user.entity';
import { Request } from 'src/maintainers/request/entities/request.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.clients, { eager: true })
  createdBy: User;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  members: User[];

  @OneToMany(() => Request, (request) => request.project)
  requests: Request[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
