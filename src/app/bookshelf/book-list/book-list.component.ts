import { Book } from './../../shared/book/book.model';
import { BookshelfService } from './../bookshelf.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {
  private bookListSub: Subscription;
  @Input() book: Book;
  myBooks: Book[] = [];
  sortField = 'author';
  sortSwitcher = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookshelfService: BookshelfService
  ) {}

  ngOnInit(): void {
    // Use the Service to set the local "myBooks" array to the Service/Glboal "myBooks" array
    this.myBooks = this.bookshelfService.getBooks();

    // Listen for changes on the global "myBooks" arary and update the local version
    this.bookListSub = this.bookshelfService.bookListChanged.subscribe(
      (books: Book[]) => {
        this.myBooks = books;
      }
    );
  }

  ngOnDestroy() {
    this.bookListSub.unsubscribe();
  }

  onSort() {
    this.sortSwitcher = !this.sortSwitcher;

    if (this.sortSwitcher) {
      this.sortField = 'author';
    } else {
      this.sortField = 'title';
    }
  }

  onRemoveBook(idx: number) {
    this.bookshelfService.removeBook(idx);
  }

  onNewBook() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
