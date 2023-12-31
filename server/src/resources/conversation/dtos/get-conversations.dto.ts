import { IsNotEmpty, IsString } from 'class-validator';

export class GetConversationsDto {
  @IsString()
  @IsNotEmpty()
  from: string;
}
