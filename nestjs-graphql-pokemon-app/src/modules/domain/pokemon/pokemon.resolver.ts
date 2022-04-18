import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PokemonEntity } from '../entity/pokemon.entity';
import { PokemonService } from './pokemon.service';

@Resolver(of => PokemonEntity)
export class PokemonResolver {
  constructor(private pokemonService: PokemonService) {
  }

  @Query()
  async pokemons() {
    return await this.pokemonService.getPokemons();
  }

  @Mutation()
  async create(@Args('name') name, @Args('type') type) {
    return this.pokemonService.createPokemon({ name, type });
  }

  @Mutation()
  async update(@Args('id') id, @Args('name') name, @Args('type') type) {
    return this.pokemonService.update(id, { name, type });
  }

  @Mutation()
  async assign(@Args('id') id, @Args('leagueId') leagueId) {
    return this.pokemonService.assignLeague(id, leagueId);
  }

  @Mutation()
  async delete(@Args('id') id) {
    await this.pokemonService.delete(id);
    return { delete: true };
  }

  @Query()
  async pokemon(@Args('id') id: string) {
    return await this.pokemonService.show(id);
  }
}
