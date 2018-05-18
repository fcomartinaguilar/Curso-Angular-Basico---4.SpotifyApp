import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinfoto'
})
export class SinfotoPipe implements PipeTransform {

  transform(imagenes: any[]): any {
    
    let noimagen = 'assets/img/noimage.png';
    
    if ( !imagenes ) {
      return noimagen;
    }
    
    return (imagenes.length > 0) ? imagenes[1].url : noimagen;
  }
}
