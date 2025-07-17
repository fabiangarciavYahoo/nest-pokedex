import { BadRequestException, Get, Injectable, InternalServerErrorException, Param } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

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

   findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null;
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
      throw new InternalServerErrorException(`Error fetching pokemon with term ${term}: ${error.message}`);
    }
    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
