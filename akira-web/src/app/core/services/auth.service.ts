import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap, catchError } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Updated import for v4+
import { isPlatformBrowser } from '@angular/common';
import { UserInfo } from '../models/user-info';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly ROOT_URL = environment.apiUrl; // Backend URL from environment
  private userAuthInfo: UserInfo = {};
  private userAuth$ = new BehaviorSubject<UserInfo>(this.userAuthInfo);
  public userAuthObs = this.userAuth$.asObservable();
  private refreshTokenTimeout: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadSession();
    }
  }

  private loadSession() {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userAuthInfo = {
          ...decoded,
          jwt_token: token,
        };
        this.userAuth$.next(this.userAuthInfo);
        this.startRefreshTokenTimer();
      } catch (error) {
        console.error('Invalid token', error);
        this.logout();
      }
    }
  }

  public isLoggedOn(): boolean {
    return !!this.userAuth$.value.jwt_token;
  }

  public getToken(): string | undefined {
    return this.userAuth$.value.jwt_token;
  }

  login(loginInfo: UserInfo) {
    return this.http
      .post<{ accessToken: string }>(`${this.ROOT_URL}/auth/signin`, loginInfo)
      .pipe(
        tap(({ accessToken }) => {
          const decoded: any = jwtDecode(accessToken);
          this.userAuthInfo = {
            ...decoded,
            jwt_token: accessToken,
          };

          this.userAuth$.next(this.userAuthInfo);
          this.setSession(accessToken);
          this.startRefreshTokenTimer();
          this.router.navigate(['']);
        }),
        catchError((err) => {
          console.error(err);
          alert(err.error?.message || 'Login failed');
          throw err;
        })
      );
  }

  register(registerInfo: any) {
    return this.http
      .post(`${this.ROOT_URL}/auth/signup`, registerInfo)
      .pipe(
        tap(() => {
          this.router.navigate(['/login']);
        })
      );
  }

  logout() {
    this.userAuthInfo = {};
    this.userAuth$.next({});
    this.removeSession();
    this.stopRefreshTokenTimer();
    this.router.navigate(['/login']);
  }

  private setSession(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jwt', token);
    }
  }

  private removeSession() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt');
    }
  }

  // Refresh Token Logic
  startRefreshTokenTimer() {
    if (!this.userAuth$.value.exp) return;
    
    // Refresh 1 minute before expiry
    const expires = new Date(this.userAuth$.value.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000; 

    // Helper to ensure we don't set negative timeout
    const safeTimeout = Math.max(timeout, 0);

    this.stopRefreshTokenTimer(); // Clear existing
    this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken().subscribe();
    }, safeTimeout);
  }

  private stopRefreshTokenTimer() {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  refreshToken() {
    const userInfo: UserInfo = {
      ...this.userAuthInfo,
      exp: undefined,
      jwt_token: undefined,
    };
    return this.http
      .post<{ accessToken: string }>(
        `${this.ROOT_URL}/auth/refresh-token`,
        userInfo
      )
      .pipe(
        tap(({ accessToken }) => {
          const decoded: any = jwtDecode(accessToken);
          this.userAuthInfo = {
             ...decoded,
            jwt_token: accessToken,
          };
          this.userAuth$.next(this.userAuthInfo);
          this.setSession(accessToken);
          this.startRefreshTokenTimer();
        }),
        catchError((err) => {
          this.logout();
          throw err;
        })
      );
  }
}
