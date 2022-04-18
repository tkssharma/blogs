import { Module } from '@nestjs/common';
import { LeagueResolver } from './league.resolver';
import { LeagueService } from './league.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueEntity } from '../entity/league.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeagueEntity])],
  providers: [LeagueResolver, LeagueService],
})
export class LeagueModule {
}
