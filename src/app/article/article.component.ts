import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {

  postList: Post[] = [];

  title: string;
  body: string;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPostList().subscribe(data => this.postList = data);
  }

  createPost() {
    const data = {
      title: this.title,
      body: this.body,
    }
    this.postService.postArticle(data)
  }

}
