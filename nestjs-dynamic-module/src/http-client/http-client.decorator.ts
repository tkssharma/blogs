import { Inject } from "@nestjs/common";
import { HTTP_CLIENT_TOKEN } from "./http-client.constants";

export function InjectHttpClient() {
  return Inject(HTTP_CLIENT_TOKEN);
}
