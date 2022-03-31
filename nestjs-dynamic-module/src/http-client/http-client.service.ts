// Package.
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Inject } from "@nestjs/common";

// Internal.
import { HTTP_CLIENT_MODULE_OPTIONS } from "./http-client.constants";
import { HttpClientModuleOptions } from "./http-client.interface";

export class HttpClientService {
  private readonly apiUrl: string = "";
  private readonly apiKey: string = "";

  constructor(
    @Inject(HTTP_CLIENT_MODULE_OPTIONS)
    private readonly options: HttpClientModuleOptions
  ) {
    this.apiUrl = this.options.apiUrl;
    this.apiKey = this.options.apiKey;
  }

  async fetch(method: any, data: any): Promise<AxiosResponse<any>> {
    return axios({
      method,
      data,
      url: `${this.apiUrl}/fetch`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }
}
