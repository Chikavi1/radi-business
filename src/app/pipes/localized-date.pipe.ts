import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate'
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {
  }

  transform(value: any, pattern: string = 'mediumDate'): any {
    const datePipe: DatePipe = new DatePipe(this.translateService.getBrowserLang());
    // console.log(value,pattern,datePipe);
    return datePipe.transform(value, pattern);
  }

}
