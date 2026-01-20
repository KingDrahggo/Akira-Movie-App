import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { MovieDiscover } from '../../core/models/movie';
import { debounceTime, distinctUntilChanged, Subject, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.html',
  styleUrls: ['./search.scss']
})
export class Search implements OnInit {
  searchTerm = '';
  movies: MovieDiscover[] = [];
  private searchSubject = new Subject<string>();

  constructor(private movieService: MovieService, private route: ActivatedRoute) {
    // Debounce search input
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => {
          if (!term.trim()) return of({ results: [] });
          return this.movieService.searchMovies(term);
      })
    ).subscribe(response => {
       this.movies = response.results || [];
    });
  }

  ngOnInit() {
    // Check if query param provided (e.g. from navbar if we had a global input there)
    this.route.queryParams.subscribe(params => {
        if (params['q']) {
            this.searchTerm = params['q'];
            this.onSearch(this.searchTerm);
        }
    });

    // Initial random/popular or empty? Empty for now, or maybe trending.
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }
}
