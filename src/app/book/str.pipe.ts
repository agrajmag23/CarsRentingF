import{Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'strManipulate'})
export class StrPipe implements PipeTransform {
    transform(value: string){
        var strArray = value.split(",");
        var str2 = strArray[0]
        return str2;
    }
}