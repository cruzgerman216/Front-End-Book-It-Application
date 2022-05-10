import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/auth/auth.guard';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookResolverService } from './book-resolver.service';
import { BookshelfEditorComponent } from './bookshelf-editor/bookshelf-editor.component';
import { BookshelfComponent } from './bookshelf.component';
import { BookshelfHomeComponent } from './bookshelf-home/bookshelf-home.component';

const routes: Routes = [
  {
    path: '',
    component: BookshelfComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: BookshelfHomeComponent,
      },
      {
        path: 'new',
        component: BookshelfEditorComponent,
      },
      {
        path: ':id',
        component: BookDetailsComponent,
        resolve: [BookResolverService],
      },
      {
        path: ':id/edit',
        component: BookshelfEditorComponent,
        resolve: [BookResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookshelfRoutingModule {}
