import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading:boolean;
  error:boolean;
  mensajeError:string;
  nuevasCanciones: any[] = [];

  constructor( private _spotyfy:SpotifyService) { 

    this.loading = true;
    this.error = false;

    this._spotyfy.getNewReleases()
      .subscribe( (nuevas:any) => {
        this.nuevasCanciones = nuevas;
        this.loading = false;
      }, ( errorServicio ) => {
        this.loading = false;
        this.error = true;
        this.mensajeError = errorServicio.error.error.message;
      });
  }

  ngOnInit() {
  }

}
