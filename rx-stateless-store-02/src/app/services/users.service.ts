import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map, shareReplay } from 'rxjs/operators';
import { combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { PostsService } from './posts.service';
import { Users } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userSelectedAction = new Subject<number>();
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  user$ = this.http.get<Users>(this.usersUrl).pipe(shareReplay());
  userWithPost$ = combineLatest(
    this.user$,
    this.postsService.post$
  ).pipe( map( ([users, posts]) => {
    return users.map( user => ({
      ...user,
      posts: posts.filter( post => post.userId == user.id)
    }))
  }));

  selectedUser$ = combineLatest(
    this.userSelectedAction,
    this.userWithPost$
  ).pipe(
    map( ([selectedUserId, users]) => users.find( user => user.id == selectedUserId))
  )

  constructor(private http: HttpClient, private postsService: PostsService) { }

  changeSelectedUser(id) {
    this.userSelectedAction.next(id);
  }
}
