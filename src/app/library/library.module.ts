import { NgModule } from '@angular/core';
import { LibraryComponent } from './library.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookResultsComponent } from './book-results/book-results.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LibraryComponent, BookSearchComponent, BookResultsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: LibraryComponent }]),
  ],
})
export class LibraryModule {}
