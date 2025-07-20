import { IsInt, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  limit?: number;
  @IsOptional()
  @IsInt()
  @IsPositive()
  offset?: number;
}
