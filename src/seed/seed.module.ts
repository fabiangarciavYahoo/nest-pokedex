import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Pokemon, PokemonSchema } from 'src/pokemon/entities/pokemon.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    PokemonModule,
    CommonModule,
    // MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
  ]
})
export class SeedModule {}
