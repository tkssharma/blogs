// Internal.
import { HttpClientModuleOptions } from "./http-client.interface";
import { HttpClientService } from "./http-client.service";

// Code.
export const getHttpClientModuleOptions = (
  options: HttpClientModuleOptions
): HttpClientService => new HttpClientService(options);
