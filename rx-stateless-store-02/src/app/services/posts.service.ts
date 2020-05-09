import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map, shareReplay } from 'rxjs/operators';
import { Posts } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postUrl = 'https://jsonplaceholder.typicode.com/posts';
  posts: Posts = [];

  post$ = this.http.get<Posts>(this.postUrl).pipe(
    shareReplay()
  );
  constructor(private http: HttpClient) { }
}