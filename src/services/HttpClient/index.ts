import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class HttpClient {
  private readonly baseUrl: string = "https://api.themoviedb.org/3";
  private readonly token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTU3MGY3ZTBkODYyOWI0MTc4ZGQ3NmEyZWU2MDlmZCIsInN1YiI6IjYzNDBiM2U4MzlhMWE2MDA4ZThhZjJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WuRblvTLKs0RzsXEgCjjblcPaUX7XHb6ZbcqOQvSnmI";
  private readonly apiKey: string = "91570f7e0d8629b4178dd76a2ee609fd";
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json",
        "charset": "utf-8",
      },
    });
  }

  async get(path: string, options: AxiosRequestConfig) {
    const optionsWithApiKey: AxiosRequestConfig = {
      ...options,
      params: {
        api_key: this.apiKey,
        ...options.params,
      },
    };
    const response = await this.axios.get(path, optionsWithApiKey);
    return response.data;
  }
}
export default new HttpClient();
