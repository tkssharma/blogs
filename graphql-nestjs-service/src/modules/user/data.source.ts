const { RESTDataSource } = require('apollo-datasource-rest');
import { Injectable } from '@nestjs/common';

@Injectable()
class MoviesAPI extends RESTDataSource {
  // Inject whatever Nest dependencies you want
  constructor() {
    super();
    this.baseURL = 'https://movies-api.example.com/';
  }

  async getMovie(id) {
    return this.get(`movies/${id}`);
  }

  async getMostViewedMovies(limit = 10) {
    const data = await this.get('movies', {
      per_page: limit,
      order_by: 'most_viewed',
    });
    return data.results;
  }
}
