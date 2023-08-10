import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceMeasure'
})
export class DistanceMeasurePipe implements PipeTransform {

  transform(distance, pattern: string = 'km'): unknown {
    let result = 0;
    if(pattern == 'mi'){
      result = (distance*0.6214);
    }else{
      result = distance*1;
    }
    return result.toFixed(2);
  }

}
