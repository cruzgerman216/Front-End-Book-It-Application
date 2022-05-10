import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ],
})
export class AuthModule {}
