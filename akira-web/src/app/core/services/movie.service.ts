import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDiscover, MovieDiscoverList } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly API_KEY = '113b9c813e2749e6edd312ae164e46f6';
  private readonly BASE_URL = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getDiscoverMovies(page: number = 1): Observable<MovieDiscoverList> {
    const url = `${this.BASE_URL}/discover/movie?api_key=${this.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
    return this.http.get<MovieDiscoverList>(url);
  }

  getMovieParams(id: number): Observable<any> {
      return this.http.get(`${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}&append_to_response=videos,credits`);
  }

  // New: Search Movies
  searchMovies(query: string, page: number = 1): Observable<MovieDiscoverList> {
    const url = `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;
    return this.http.get<MovieDiscoverList>(url);
  }

  // New: Get Movies by Genre
  getMoviesByGenre(genreId: number, page: number = 1): Observable<MovieDiscoverList> {
      const url = `${this.BASE_URL}/discover/movie?api_key=${this.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`;
      return this.http.get<MovieDiscoverList>(url);
  }
}

export const GENRES = {
    ACTION: 28,
    ADVENTURE: 12,
    ANIMATION: 16,
    COMEDY: 35,
    CRIME: 80,
    DOCUMENTARY: 99,
    DRAMA: 18,
    FAMILY: 10751,
    FANTASY: 14,
    HISTORY: 36,
    HORROR: 27,
    MUSIC: 10402,
    MYSTERY: 9648,
    ROMANCE: 10749,
    SCIFI: 878,
    TV_MOVIE: 10770,
    THRILLER: 53,
    WAR: 10752,
    WESTERN: 37
};
