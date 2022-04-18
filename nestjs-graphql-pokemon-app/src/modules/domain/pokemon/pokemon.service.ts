import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeagueEntity } from '../entity/league.entity';
import { PokemonEntity } from '../entity/pokemon.entity';
import { CreatePokemonDto } from './pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(@InjectRepository(PokemonEntity) private readonly pokemonRepository: Repository<PokemonEntity>,
    @InjectRepository(LeagueEntity) private readonly leagueRepository: Repository<LeagueEntity>
  ) {
  }

  async createPokemon(data: CreatePokemonDto): Promise<PokemonEntity> {
    let pokemon = new PokemonEntity();
    pokemon.name = data.name;
    pokemon.type = data.type;
    await pokemon.save();
    return pokemon;
  }

  async delete(id): Promise<PokemonEntity> {
    const pokemon = await this.pokemonRepository.findOne({ where: { id } });
    await this.pokemonRepository.delete(id);
    return pokemon;
  }

  async update(id, data: CreatePokemonDto): Promise<PokemonEntity> {
    const pokemon = await this.pokemonRepository.findOne({ where: { id } });
    pokemon.name = data.name;
    pokemon.type = data.type;
    await pokemon.save();
    return pokemon;
  }
  // assign league to the pokemon 
  async assignLeague(id: string, leagueId: string) {
    const pokemon = await this.pokemonRepository.findOne({ where: { id } });
    const league = await this.leagueRepository.findOne({ where: { id: leagueId } });
    pokemon.league = league;
    await pokemon.save();
    return pokemon;
  }

  async show(id: string) {
    return await this.pokemonRepository.findOne({ where: { id } });
  }

  async getPokemons() {
    return await this.pokemonRepository.find({});
  }
}
