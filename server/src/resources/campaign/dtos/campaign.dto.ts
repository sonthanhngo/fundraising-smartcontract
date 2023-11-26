import { IsArray, ArrayMinSize, IsNotEmpty, IsString } from 'class-validator';

export class CampaignDto {
  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  target: string;

  @IsString()
  @IsNotEmpty()
  deadline: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  images: string[];
}
