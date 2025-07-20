import { BadRequestException, Get, Injectable, InternalServerErrorException, Param } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService, 
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit', 10);
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const newPokemon = {
      name: createPokemonDto.name.toLocaleLowerCase(),
      no: createPokemonDto.no,
      }
      const pokemon = await this.pokemonModel.create(newPokemon);
      return {message: 'This action adds a new pokemon', pokemon};
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
      }
      console.error(error);
      throw new InternalServerErrorException('An error occurred while creating the pokemon');
    }
  }

   findAll(paginantionDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginantionDto;

    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;
    try {
      pokemon = !isNaN(+term) 
        ? await this.pokemonModel.findOne({no: term})
        : isValidObjectId(term)
        ? await this.pokemonModel.findById(term)
        : await this.pokemonModel.findOne({name: term.toLocaleLowerCase().trim()});
      if (!pokemon) {
        throw new BadRequestException(`Pokemon with term ${term} not found`);
      }
    } catch (error) {
      this.handleExceptions(error);
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    let pokemon: Pokemon | null;
    try {
      pokemon = await this.findOne(term);
      if (!pokemon) {
        throw new BadRequestException(`Pokemon with term ${term} not found`);
      }
      const updatedPokemon = {
        ...pokemon.toObject(),
        no: updatePokemonDto.no ? updatePokemonDto.no : pokemon.no,
        name: updatePokemonDto.name ?  updatePokemonDto.name.toLocaleLowerCase() : pokemon.name,
      };
      await pokemon.updateOne(updatedPokemon);
      return updatedPokemon
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
      const {deletedCount, acknowledged} = await this.pokemonModel.deleteOne({ _id: id });
      if (deletedCount === 0) {
        throw new BadRequestException(`Pokemon with id ${id} not found`);
      }
      return
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.error(error);
    throw new InternalServerErrorException('An error occurred while processing the request');
  }
}
