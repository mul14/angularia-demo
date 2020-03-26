import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Post } from './models/post';
import { PostService } from './services/post.service';
import { AuthService } from './auth/auth.service';

enum TabList {
  Profile,
  Skills,
  Summary,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'angularia';

  search = new FormControl('');

  postList: Post[] = [];

  constructor(private postService: PostService, private authService: AuthService) {

    this.search.valueChanges.pipe(
      debounceTime(600),
    ).subscribe(data => {
      console.log('600ms kemudian');
    });
  }

  fetchData() {
    this.postService.getPostList().subscribe(data => this.postList = data);
  }

  logout() {
    this.authService.logout();
  }

  isLogin(): boolean {
    return this.authService.isLogin();
  }
}
