import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authObsrv: Observable<AuthResponseData>;
  errMsg: string = null;
  isLoginMode = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onAuthFormSubmit(formObj: NgForm) {
    // Validation check on the form
    if (!formObj.valid) return;

    // Destructure the form input values
    const { email, password } = formObj.value;

    // Conditional statement to see what mode we are in
    if (this.isLoginMode) {
      // Sign In Logic
      this.authObsrv = this.authService.signIn(email, password);
    } else {
      // Sign Up Logic
      this.authObsrv = this.authService.signUp(email, password);
    }

    // Observable Logic w/ Error Handling
    this.authObsrv.subscribe(
      (res) => {
        console.log('AUTH RESPONSE SUCCESS:', res);
        if (this.errMsg) this.errMsg = null;
        this.router.navigate(['bookshelf']);
      },
      (err) => {
        console.log('AUTH RESPONSE ERROR:', err);
        this.errMsg = err.message;
      }
    );

    // RESET
    formObj.reset();
  }
}
