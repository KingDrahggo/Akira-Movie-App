import { Injectable } from '@angular/core';
import { MovieDiscover } from '../models/movie';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private storageKey = 'akira_watchlist';
  private watchlist$ = new BehaviorSubject<MovieDiscover[]>(this.loadWatchlist());

  watchlistObs = this.watchlist$.asObservable();

  constructor() {}

  private loadWatchlist(): MovieDiscover[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  getWatchlist(): MovieDiscover[] {
    return this.watchlist$.value;
  }

  addToWatchlist(movie: any) {
    const current = this.getWatchlist();
    if (!current.find(m => m.id === movie.id)) {
        // Normalize object if it comes from detail page (ensure it has necessary fields)
        const normalized: MovieDiscover = {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            vote_average: movie.vote_average,
            overview: movie.overview,
            release_date: movie.release_date,
             // ... other fields default or mapped
             adult: movie.adult || false,
             genre_ids: movie.genres ? movie.genres.map((g: any) => g.id) : [],
             original_language: movie.original_language || 'en',
             original_title: movie.original_title || movie.title,
             popularity: movie.popularity || 0,
             video: false,
             vote_count: movie.vote_count || 0
        };

        const updated = [...current, normalized];
        this.updateStorage(updated);
    }
  }

  removeFromWatchlist(movieId: number) {
    const current = this.getWatchlist();
    const updated = current.filter(m => m.id !== movieId);
    this.updateStorage(updated);
  }

  isInWatchlist(movieId: number): boolean {
    return !!this.getWatchlist().find(m => m.id === movieId);
  }

  private updateStorage(movies: MovieDiscover[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(movies));
    this.watchlist$.next(movies);
  }
}
