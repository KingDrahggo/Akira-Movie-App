import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { UserInfo } from '../../core/models/user-info';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  user$: Observable<UserInfo>;
  isLoggedIn$: Observable<boolean>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.userAuthObs;
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user.jwt_token));
  }

  ngOnInit() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.auth.logout();
    this.toggleMobileMenu(); // Close menu if open
  }
}
