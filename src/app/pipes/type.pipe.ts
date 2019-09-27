import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'types'
})
export class TypePipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
      case 0 : return '首页Banner';
      case 1 : return '找职位Banner';
      case 2 : return '找精英Banner';
      case 3 : return '行业大图';
      
    }
    
   }

  

}
