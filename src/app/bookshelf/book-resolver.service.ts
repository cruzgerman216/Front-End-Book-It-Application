import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Book } from '../shared/book/book.model';
import { BookshelfService } from './bookshelf.service';
import { HttpService } from '../shared/http/http.service';

@Injectable({ providedIn: 'root' })
export class BookResolverService implements Resolve<Book[]> {
  constructor(
    private bookshelfService: BookshelfService,
    private httpService: HttpService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const books = this.bookshelfService.getBooks();

    if (books.length === 0) {
      return this.httpService.fetchBooksFromFirebase() || [];
    } else {
      return books;
    }
  }
}
