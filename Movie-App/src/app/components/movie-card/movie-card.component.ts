import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { MovieService } from '../../services/movie.service';
import { MovieDiscover } from '../../movies';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movies: any[];
  movie: any;
  trailer: any;


  constructor(private movieService: MovieService,
              private activatedRoute: ActivatedRoute) {

   }

  ngOnInit(): void {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.movie = this.movies.filter(m => m.id === id);
  }

  getMovies(){
    this.movieService.getMovies().subscribe(
      (data) => {
        this.trailer = data.results;
        console.log(data) // This displays the youtube trailer data
        console.log(this.trailer) // This comesback undefined
      },
      (error) => {
        console.error('Request failed with error');
      },
      () => {
        console.log('Request completed');
      }
    );
  }
}
