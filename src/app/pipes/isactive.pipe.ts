import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isitactive'
})
export class IsactivePipe implements PipeTransform {

  transform(value: string): string {
    return value === '1' ? 'Yes' : (value === '0' ? 'No' : 'Unknown');
  }

}
