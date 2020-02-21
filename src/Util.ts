export namespace Util {

export function errorToString(err: Error | string){
  let s: string;
  if(typeof err == "string"){
    s = err;
  }
  else{
    if(err.message){
      s = err.message;
    }
    else{
      s = JSON.stringify(err, null, " ");
    }
  }
  return s;
}

export function dateToString(date: Date, emptyStr: string = "(n/a)"){
  if(date){
    return `${date.getUTCFullYear()}`
    + "/"
    + ("00" + (date.getUTCMonth() + 1)).slice(-2)
    + "/"
    + ("00" + date.getUTCDate()).slice(-2)
    + " "
    + ("00" + date.getUTCHours()).slice(-2)
    + ":"
    + ("00" + date.getUTCMinutes()).slice(-2)
    + ":"
    + ("00" + date.getUTCSeconds()).slice(-2);
  }
  return emptyStr;
}

var debug_date: string | undefined = undefined;

export function dateNow() {
  if(debug_date){
    const y = parseInt(debug_date.substr(0, 4));
    const m = parseInt(debug_date.substr(4, 2)) - 1;
    const d = parseInt(debug_date.substr(6, 2));
    return new Date(Date.UTC(y, m, d, 0, 0, 0, 0));
  }
  else{
    return new Date(Date.now() +  (9 * 60 * 60 * 1000));
  }
}

export function setDebugDate(s: string) {
  debug_date = s;
}

export function stringToDate(s: string) {
  return new Date(Date.UTC(
    parseInt(s.substring(0, 4)),
    parseInt(s.substring(5, 7)) - 1,
    parseInt(s.substring(8, 10)),
    parseInt(s.substring(11, 13)),
    parseInt(s.substring(14, 16)),
    parseInt(s.substring(17, 19))
  ));
}

export function dateString(raw?: string)
{
  if(!raw) return "";
  // 01234567890123
  // yyyymmsshhmmss
  const s = raw.replace(/[^0-9]/g, "");
  return  s.substr(0, 4) + "年" +
          parseInt(s.substr(4, 2), 10).toString() + "月" +
          parseInt(s.substr(6, 2), 10).toString() + "日";
}

export function dateStringWithoutYear(raw?: string)
{
  if(!raw) return "";
  const s = raw.replace(/[^0-9]/g, "");
  return  parseInt(s.substr(4, 2), 10).toString() + "月" +
          parseInt(s.substr(6, 2), 10).toString() + "日";
}

export function addCommaString(raw: string)
{
  return raw.replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');    
}

} /* namespace Util */
