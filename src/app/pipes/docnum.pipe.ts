import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'docnum'
})
export class DocnumPipe implements PipeTransform {

  transform(value: any, length: number = 5): any {
    const numericValue = +value;

    if (isNaN(numericValue)) {
      return value;
    }

    const paddedValue = numericValue.toString().padStart(length, '0');
    return paddedValue;
  }

}
