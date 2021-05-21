import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoGames } from '../model/videogames.model';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  constructor(private http: HttpClient) { }

  getVideoGames(): Observable<[VideoGames]>{
    return this.http.get<[VideoGames]>('https://super-rest.herokuapp.com/test/videogames');
  }

  getSingleVideoGame(id: string): Observable<VideoGames>{
    return this.http.get<VideoGames>('https://super-rest.herokuapp.com/test/videogames/' + id);
  }

  saveVideoGame(item: VideoGames, id?: string): Observable<any>{
    //Update
    if(id !=='') {
      return this.http.put('https://super-rest.herokuapp.com/test/videogames/' + id, item);
    }

    return this.http.post('https://super-rest.herokuapp.com/test/videogames', item);
  }

  deleteVideoGame(id: string): Observable<any>{
    return this.http.delete('https://super-rest.herokuapp.com/test/videogames/' + id);
  }
  
}
