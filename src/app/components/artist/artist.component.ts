import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService} from '../../services/spotify.service';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artista:any = {};
  pistas:any[] = [];
  loading:boolean;

  constructor(private activatedRoute:ActivatedRoute,
              public _spotify:SpotifyService) { }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.params
      .pipe(map( params => params['id']))
        .subscribe( id => {
          console.log( id );
          this._spotify.getArtista( id )
            .subscribe( artista => {
              console.log(artista);
              this.artista = artista;
              this.loading = false;
          });

          this._spotify.getTop( id )
            .pipe(map( (resp:any) => resp.tracks ))  
            .subscribe( pistas => {
                console.log(pistas);
                this.pistas = pistas;
            });
    })



  }

}
