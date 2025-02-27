import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSlice',
})
export class CustomSlicePipe implements PipeTransform {
  transform(value: string, splite:string , start: number, end: number , join:string): string {
    return value.split(splite).slice(start, end).join(join);
  }
}
