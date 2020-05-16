import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map, shareReplay } from 'rxjs/operators';
import { Posts } from '../interfaces/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
 
constructor(private httpclient: HttpClient){

}

public getBooks(): Observable<any> {
  return this.httpclient.get('/books');
}

}