import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { catchError, delay, retry, retryWhen, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) { }

  getPostList() {
    const url = this.baseUrl + '/posts';
    return this.http.get<Post[]>(url).pipe(
      catchError(error => of(error.message)),
      retry(3)
    )
  }

  getById(id) {
    return this.http.get<Post>(this.baseUrl + '/posts/' + id)
  }

  postArticle(data) {
    const url = this.baseUrl + '/posts';

    return this.http.post(url, data)
  }
}
