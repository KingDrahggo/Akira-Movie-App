import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService, GENRES } from '../../core/services/movie.service';
import { MovieDiscover } from '../../core/models/movie';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './browse.html',
  styleUrls: ['./browse.scss']
})
export class Browse implements OnInit {
  movies: MovieDiscover[] = [];
  title = 'All Movies';
  genres = GENRES;

  constructor(
      private movieService: MovieService, 
      private route: ActivatedRoute,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        const genreId = params['genre'];
        const genreName = params['name'];

        if (genreId) {
            this.title = genreName ? `${genreName} Movies` : 'Movies';
            this.loadGenre(genreId);
        } else {
            this.title = 'Popular Movies';
            this.loadPopular();
        }
    });
  }

  loadPopular() {
      console.log('Loading Popular Movies...');
      this.movieService.getDiscoverMovies().subscribe({
          next: (res) => {
              console.log('Popular Movies Loaded:', res.results?.length);
              this.movies = res.results || [];
              this.cdr.detectChanges();
          },
          error: (err) => console.error('Error loading popular:', err)
      });
  }

  loadGenre(id: number) {
      console.log('Loading Genre:', id);
      this.movieService.getMoviesByGenre(id).subscribe({
          next: (res) => {
              console.log(`Genre ${id} Loaded:`, res.results?.length);
              this.movies = res.results || [];
              this.cdr.detectChanges();
          },
          error: (err) => console.error('Error loading genre:', err)
      });
  }
}
