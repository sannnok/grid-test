import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empty'
})
export class EmptyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value || '';
  }

}
