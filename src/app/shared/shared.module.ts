import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { BookComponent } from './book/book.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceholderDirective } from './directives/placeholder.directive';

@NgModule({
  declarations: [
    AlertComponent,
    BookComponent,
    DropdownDirective,
    PlaceholderDirective,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    AlertComponent,
    BookComponent,
    DropdownDirective,
    PlaceholderDirective,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class SharedModule {}
