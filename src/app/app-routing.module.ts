import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';

const appRoutes = [
  { path: '', redirectTo: '/bookshelf', pathMatch: 'full' },
  {
    path: 'bookshelf',
    loadChildren: () =>
      import('./bookshelf/bookshelf.module').then((m) => m.BookshelfModule),
  },
  {
    path: 'library',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./library/library.module').then((m) => m.LibraryModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./shared/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
