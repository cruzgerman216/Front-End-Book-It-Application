import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../book/book.model';

@Pipe({
  name: 'sortBooks',
})
export class SortBooksPipe implements PipeTransform {
  transform(array: Book[], field: string) {
    array.sort((a, b) => {
      if (a[field] < b[field]) {
        console.log('a[field]:', a[field]);
        console.log('b[field]:', b[field]);
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
