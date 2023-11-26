import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ReviewDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  review: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
