import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../http/http.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  collapsed = true;
  show = false;

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currUser.subscribe((user) => {
      // BANG BANG => You're a Boolean
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.authService.currUser.unsubscribe();
  }

  onSaveData() {
    this.httpService.saveBooksToFirebase();
  }

  onFetchData() {
    this.httpService.fetchBooksFromFirebase().subscribe();
  }

  onSignOut() {
    this.authService.signOut();
  }
}
