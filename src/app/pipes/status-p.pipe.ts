import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusP'
})
export class StatusPPipe implements PipeTransform {

  transform(value: any, args?: any): any {
 
      switch (value) {
       
        case 1 : return '草稿';
        case 2 : return '上线';
       
        
      
      
  }

}
}
