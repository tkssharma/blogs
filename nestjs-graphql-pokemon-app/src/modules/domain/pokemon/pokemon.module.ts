import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonEntity } from '../entity/pokemon.entity';
import { LeagueEntity } from '../entity/league.entity';


@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity, LeagueEntity])],
  providers: [PokemonService, PokemonResolver],
})
export class PokemonModule {
}
