import { Observable, from, Observer } from "rxjs";
import { Util } from "./Util";

export namespace RxUtil {

export function doSubscribe(s: string, o: Observable<any>, l?: (s: string)=> void){
  const index = function() {
    const s = window.sessionStorage.getItem("doSubscribe-index");
    const n = s ? parseInt(s) : 1;
    window.sessionStorage.setItem("doSubscribe-index", `${n + 1}`);
    return n;
  }();

  const log = l ? l : (x: string) => console.log(x);
  log(`[${s}:#${index}] start subscribe`);
  o.subscribe((j)=>{
    log(`[${s}:#${index}] on next\n${Util.anyToString(j)}`);
  }, (err)=>{
    log(`[${s}:#${index}] on error\n${Util.errorToString(err)}`);
    alert(`Error:\n${Util.errorToString(err)}`);
  }, ()=>{
    log(`[${s}:#${index}] on completed`);
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

export function readySetGo<T>(ready: ()=>void, observable:Observable<T>): Observable<T>{
  return Observable.create((observer: Observer<T>) =>{
    observable.subscribe((v)=>{
      observer.next(v);
    }, (err) =>{
      observer.error(err);
    }, () =>{
      observer.complete();
    });
    ready();
  });
}

} /* namespace RxUtil */
