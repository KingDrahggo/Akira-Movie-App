import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { MovieDiscover } from '../../core/models/movie';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  movies$: Observable<MovieDiscover[]>;

  constructor(private movieService: MovieService) {
    this.movies$ = this.movieService.getDiscoverMovies().pipe(
      map(response => response.results)
    );
  }

  ngOnInit(): void {}
}
