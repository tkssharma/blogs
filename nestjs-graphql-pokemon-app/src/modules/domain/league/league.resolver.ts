import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LeagueService } from './league.service';

@Resolver('League')
export class LeagueResolver {
  constructor(private leagueService: LeagueService) {
  }

  @Query()
  async leagues() {
    return await this.leagueService.index();
  }

  @Mutation()
  async createLeague(@Args('name') name) {
    return this.leagueService.create({ name });
  }

  @Mutation()
  async updateLeague(@Args('id') id, @Args('name') name) {
    return this.leagueService.update(id, { name });
  }

  @Mutation()
  async deleteLeague(@Args('id') id) {
    await this.leagueService.delete(id);
    return { delete: true };
  }

  @Query()
  async pokemon(@Args('id') id: string) {
    return await this.leagueService.show(id);
  }
}
