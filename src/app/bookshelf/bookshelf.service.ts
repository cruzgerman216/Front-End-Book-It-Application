import { Book } from './../shared/book/book.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookshelfService {
  bookSelected = new Subject<Book>();
  bookListChanged = new Subject<Book[]>();

  // Data sources should be IMMUTABLE
  private myBooks: Book[] = [];

  // READ
  getBooks() {
    return this.myBooks.slice();
  }

  getBook(idx: number) {
    return this.myBooks.slice()[idx];
  }

  // CREATE
  saveBook(book: Book) {
    this.myBooks.push(book);
    this.bookSelected.next(book);
    this.bookListChanged.next(this.myBooks.slice());
  }

  // UPDATE
  updateBook(idx: number, updatedBookInfo: Book) {
    this.myBooks[idx] = updatedBookInfo;
    this.bookListChanged.next(this.myBooks.slice());
  }

  // DELETE
  removeBook(idx: number) {
    if (idx !== -1) {
      // We found a book at the index we passed in
      this.bookSelected.next(this.myBooks[idx]);
      this.myBooks.splice(idx, 1);
      this.bookListChanged.next(this.myBooks.slice());
    }
  }

  setBooks(books: Book[] | []) {
    console.log('books:', books);

    this.myBooks = books || [];
    this.bookListChanged.next(this.myBooks.slice());
  }
}
