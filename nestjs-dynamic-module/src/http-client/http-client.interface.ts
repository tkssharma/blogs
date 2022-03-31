// Package.
import { ModuleMetadata, Type } from "@nestjs/common";

// Code.
export interface HttpClientModuleOptions {
  apiUrl: string;
  apiKey: string;
}

export interface HttpClientModuleFactory {
  createHttpModuleOptions: () =>
    | Promise<HttpClientModuleOptions>
    | HttpClientModuleOptions;
}

export interface HttpClientModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<HttpClientModuleFactory>;
  useExisting?: Type<HttpClientModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HttpClientModuleOptions> | HttpClientModuleOptions;
}
