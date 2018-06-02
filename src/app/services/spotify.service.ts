import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  artistas:any[] = [];
  urlSpotify:string = 'https://api.spotify.com/v1/';
  
  //este token lo tengo q generar cada hora con el postman al ser una version gratuita (spotify api)
  token:string = 'BQAsa_uvBbotfDontY58Rpw-7S5aXlFmk4MNRsx4I32JyOs9-3xNE1maz9SCkx5nBvo-7KTCkClFGMvjZbY';

  constructor(public http:HttpClient) { }

  getNewReleases() {
    
    let url = `${this.urlSpotify}browse/new-releases`;
    let headers = this.getHeaders();

    return this.http.get(url, {headers:headers} )
            .pipe(map( data => {
              return data['albums'].items;
            } ));

  }

  private getHeaders():HttpHeaders {
    let headers = new HttpHeaders({
      'authorization':'Bearer ' + this.token
    });
    return headers;
  }
  
  getTop(id:string) {
    let url = `${this.urlSpotify}artists/${id}/top-tracks?country=ES`;
    
    let headers = this.getHeaders();

    return this.http.get( url, {headers:headers} );
  }

  getArtista(id:string) {
    let url = `${this.urlSpotify}artists/${id}`;

    let headers = this.getHeaders();

    // el subscribe es la respuesta -- no es necesario poner :headers
   return this.http.get( url, {headers:headers} );
        /* .pipe(map( (resp:any) => {
            this.artistas = resp.artists.items;
          return this.artistas;
   })) */
      /* .subscribe(resp => {
        console.log(resp); 
    }):*/
  }

  getArtistas(termino:string) {

    let url = `${this.urlSpotify}search?query=${termino}&type=artist&limit=20`;

    let headers = this.getHeaders();

    // el subscribe es la respuesta
   return this.http.get( url, {headers:headers} )
        .pipe(map( (resp:any) => {
            this.artistas = resp.artists.items;
          return this.artistas;
   }))
      /* .subscribe(resp => {
        console.log(resp); 
    }):*/
  }
}
