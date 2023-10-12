import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDiscover, MovieDiscoverList } from '../movies';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies: MovieDiscoverList;
  RAW_URL: string = `https://api.themoviedb.org/3/discover/movie?api_key=3b12cfa2e8e41ce85be82944f8b7e697&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
  getTrailer: string = `https://api.themoviedb.org/3/movie/`
  api_key: string = `3b12cfa2e8e41ce85be82944f8b7e697`
  last: string = `?api_key=3b12cfa2e8e41ce85be82944f8b7e697&append_to_response=videos`
  id: any;
  constructor(private http: HttpClient) {}

  //Get Movies
  getDiscoverMovies(): Observable<MovieDiscoverList> {
    return this.http.get<MovieDiscoverList>(this.RAW_URL);
  }

  getMovies(): Observable<MovieDiscoverList> {
    return this.http.get<MovieDiscoverList>(this.getTrailer,{ params:{
      id: this.id,
      last: this.last
    }});
  }

  getId(trailer: MovieDiscover): Observable<MovieDiscover>{
    const url = `https://api.themoviedb.org/3/movie/${trailer.id}?api_key=3b12cfa2e8e41ce85be82944f8b7e697language=en-US`
    return this.http.get<MovieDiscover>(url);
  }
}
