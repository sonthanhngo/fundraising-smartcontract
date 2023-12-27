import {
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty()
  target: number;

  @IsNumber()
  @IsNotEmpty()
  deadline: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  images: string[];
}
