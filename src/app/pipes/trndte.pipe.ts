import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'trndte'
})
export class TrndtePipe implements PipeTransform {

  transform(value: any): any {
    if (!value) {
      return '';
    }
    
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'M/d/yyyy');
    
    return formattedDate;
  }


}
