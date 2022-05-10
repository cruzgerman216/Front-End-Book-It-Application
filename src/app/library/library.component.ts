import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookshelfService } from '../bookshelf/bookshelf.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit, OnDestroy {
  private bookSelectedSub: Subscription;
  alert: string = null;

  constructor(private bookshelfService: BookshelfService) {}

  ngOnInit(): void {
    this.bookSelectedSub = this.bookshelfService.bookSelected.subscribe(
      (book) => {
        this.alert = `Successfully added book: ${book.title} by ${book.author}!`;

        setTimeout(() => this.handleCloseModal(), 4000);
      }
    );
  }

  ngOnDestroy() {
    this.bookSelectedSub.unsubscribe();
  }

  handleCloseModal() {
    this.alert = null;
  }
}
