import { Observable, from } from "rxjs";
import { Util } from "./Util";

export namespace RxUtil {

export function doSubscribe(s: string, o: Observable<any>, f?: (j: any) => void, l?: (s: string)=> void){
  const log = l ? l : (x: string) => console.log(x);
  log(`${s} : subscribe`);
  o.subscribe((j)=>{
    if(f){
      f(j);
    }
    else{
      log(`${s} : next ${JSON.stringify(j, null, 1)}`);
    };
  }, (err)=>{
    log(`${s} : error ${Util.errorToString(err)}`);
    alert(`エラーが発生しました\n${Util.errorToString(err)}`);
  }, ()=>{
    log(`${s} : completed`);
  });
}


export function postJson(url: string, data: any){
  return from($.ajax({
    type: "post", 
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json"
  }));
}

} /* namespace RxUtil */
