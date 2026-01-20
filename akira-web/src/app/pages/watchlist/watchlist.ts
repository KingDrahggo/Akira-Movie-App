import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WatchlistService } from '../../core/services/watchlist.service';
import { MovieDiscover } from '../../core/models/movie';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './watchlist.html',
  styleUrls: ['./watchlist.scss']
})
export class Watchlist implements OnInit {
  movies: MovieDiscover[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit() {
    this.watchlistService.watchlistObs.subscribe(movies => {
        this.movies = movies;
    });
  }
}
