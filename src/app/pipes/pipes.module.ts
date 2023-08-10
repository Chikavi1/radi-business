import { NgModule } from '@angular/core';

import { LocalizedDatePipe } from './localized-date.pipe';
import { DistanceMeasurePipe } from './distance-measure.pipe';

@NgModule({
  declarations: [LocalizedDatePipe, DistanceMeasurePipe],
  exports: [LocalizedDatePipe,DistanceMeasurePipe]
})
export class PipesModule { }
