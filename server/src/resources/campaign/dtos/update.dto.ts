import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class UpdateDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  review: string;
}
