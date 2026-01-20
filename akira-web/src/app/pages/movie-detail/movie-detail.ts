import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { WatchlistService } from '../../core/services/watchlist.service';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.scss']
})
export class MovieDetail implements OnInit {
  movie$: Observable<any> | undefined;
  isInWatchlist = false;
  currentMovie: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit() {
    this.movie$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.movieService.getMovieParams(id).pipe(
            tap(movie => {
                this.currentMovie = movie;
                this.checkWatchlistStatus(movie.id);
            })
        );
      })
    );
  }

  checkWatchlistStatus(id: number) {
      this.isInWatchlist = this.watchlistService.isInWatchlist(id);
  }

  toggleWatchlist() {
      if (!this.currentMovie) return;

      if (this.isInWatchlist) {
          this.watchlistService.removeFromWatchlist(this.currentMovie.id);
      } else {
          this.watchlistService.addToWatchlist(this.currentMovie);
      }
      this.isInWatchlist = !this.isInWatchlist;
  }

  getBackdropUrl(path: string): string {
    return path ? `https://image.tmdb.org/t/p/original${path}` : '';
  }

  getPosterUrl(path: string): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : '';
  }
}
