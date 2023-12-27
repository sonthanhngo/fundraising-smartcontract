import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsNotEmpty()
  update: string;
}
