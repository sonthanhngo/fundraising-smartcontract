import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  recipient1: string;

  @IsString()
  @IsNotEmpty()
  recipient2: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
