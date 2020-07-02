import { Injectable } from "@nestjs/common";
import { RedisService } from "nestjs-redis";

@Injectable()
export class CacheService {
  constructor(
    private readonly redisService: RedisService,
  ) { }
  public async root(): Promise<boolean> {
    const client = await this.redisService.getClient();
    return client !== null;
  }
  public async getKey(): Promise<string> {
    const client = await this.redisService.getClient();
    return client.get('key');
  }
  public async setKey(value: string): Promise<string> {
    const client = await this.redisService.getClient();
    return client.set('key', value);
  }
}
