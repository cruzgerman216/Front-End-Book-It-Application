import { BookshelfService } from './../bookshelf.service';
import { Book } from './../../shared/book/book.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  idx: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookshelfService: BookshelfService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idx = +params['id'];
      this.book = this.bookshelfService.getBook(this.idx);
    });
  }

  onEditBook() {
    this.router.navigate(['../', this.idx, 'edit'], { relativeTo: this.route });
  }

  onRemoveBook() {
    this.bookshelfService.removeBook(this.idx);
  }
}
