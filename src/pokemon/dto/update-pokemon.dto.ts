import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';
import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {
  @IsInt()
  @IsPositive()
  @Min(1)
  no?: number;
  @IsString()
  @MinLength(3)
  name?: string;
}
