// Package.
import { Provider } from "@nestjs/common";

// Internal.
import { HTTP_CLIENT_TOKEN } from "./http-client.constants";
import { HttpClientModuleOptions } from "./http-client.interface";
import { getHttpClientModuleOptions } from "./utils";

// Code.
export function createHttpClientProvider(
  options: HttpClientModuleOptions
): Provider {
  return {
    provide: HTTP_CLIENT_TOKEN,
    useValue: getHttpClientModuleOptions(options),
  };
}
