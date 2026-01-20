import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { MovieDetail } from './pages/movie-detail/movie-detail';
import { Browse } from './pages/browse/browse';
import { Search } from './pages/search/search';
import { Watchlist } from './pages/watchlist/watchlist';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'movies/:id', component: MovieDetail, canActivate: [authGuard] },
  { path: 'movies', component: Browse },
  { path: 'series', component: Browse }, // Reusing browse for now
  { path: 'search', component: Search },
  { path: 'my-list', component: Watchlist, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
