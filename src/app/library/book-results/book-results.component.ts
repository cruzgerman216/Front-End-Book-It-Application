import { BookshelfService } from './../../bookshelf/bookshelf.service';
import { LibraryService } from './../library.service';
import { Book } from './../../shared/book/book.model';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  animate,
  transition,
  keyframes,
  style,
} from '@angular/animations';

@Component({
  selector: 'app-book-results',
  templateUrl: './book-results.component.html',
  styleUrls: ['./book-results.component.css'],
  animations: [
    trigger('swoopIn', [
      state(
        'in',
        style({
          transform: 'scale(1)',
          opacity: 1,
        })
      ),
      transition(':enter', [
        animate(
          '1s',
          keyframes([
            style({
              transform: 'scale(0)',
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: 'scale(0.7)',
              opacity: 0.7,
              offset: 0.6,
            }),
            style({
              transform: 'scale(1)',
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class BookResultsComponent implements OnInit {
  bookResults: Book[] = [];

  constructor(
    private bookshelfService: BookshelfService,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    // Bring Global "apiBooks" array into the Local "bookResults" array
    this.bookResults = this.libraryService.getBooks();
    this.libraryService.bookListChanged.subscribe((books: Book[]) => {
      this.bookResults = books;
    });
  }

  onSaveBook(book: Book) {
    // Pass this to the "bookshelfService" "myBooks" array
    this.bookshelfService.saveBook(book);
  }
}
