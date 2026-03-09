import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateCollegeDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsInt()
  ranking?: number;

  @IsOptional()
  @IsInt()
  fees?: number;
}
