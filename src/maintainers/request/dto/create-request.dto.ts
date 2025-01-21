import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsUUID()
  projectId: string; // Proyecto al que pertenece la solicitud

  @IsNotEmpty()
  @IsString()
  type: 'FunctionalRequirement' | 'Support' | 'Improvement';

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  assignedToId?: string; // Usuario asignado (opcional)
}
