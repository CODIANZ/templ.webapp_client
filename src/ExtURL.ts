
export class ExtURL{
  private m_dic: {[_:string]: string | null} = {};
  public constructor(s: string){
    const url = new URL(s);
    const params = url.search.substr(1).split("&");
    params.forEach((param)=>{
      const kv = param.split("=");
      if(kv[1]){
        this.m_dic[kv[0]] = decodeURIComponent(kv[1]);
      }
      else{
        this.m_dic[kv[0]] = null;
      }
    });
  }
  public getQueryParameter(key: string){
    if(key in this.m_dic){
      return this.m_dic[key];
    }
    else{
      return null;
    }
  }
}
