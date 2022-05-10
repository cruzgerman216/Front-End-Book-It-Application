import { NgModule } from '@angular/core';
import { BookshelfComponent } from './bookshelf.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookshelfHomeComponent } from './bookshelf-home/bookshelf-home.component';
import { BookshelfEditorComponent } from './bookshelf-editor/bookshelf-editor.component';
import { SortBooksPipe } from '../shared/pipes/sortBooks.pipe';
import { SharedModule } from '../shared/shared.module';
import { BookshelfRoutingModule } from './bookshelf-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BookshelfComponent,
    BookListComponent,
    BookDetailsComponent,
    BookshelfHomeComponent,
    BookshelfEditorComponent,
    SortBooksPipe,
  ],
  imports: [SharedModule, BookshelfRoutingModule],
})
export class BookshelfModule {}
