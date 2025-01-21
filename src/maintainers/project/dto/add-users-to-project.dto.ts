import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddUsersToProjectDto {
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @IsUUID('4', { each: true }) // Valida que cada elemento sea un UUID
  userIds: string[];
}
