import { RxUtil } from "./RxUtil";
import { mergeMap, map } from 'rxjs/operators';
import { from } from "rxjs";

const host = "localhost:50555";

$(document).ready(()=>{
  $("#client").attr("href", `client.html?host=${host}`);
  $("#update").on("click", ()=>{
    doUpdate();
  });
});

function doUpdate() {
  $("#socket_ids").empty();
  RxUtil.doSubscribe("get_socket_ids",
    RxUtil.postJson(`http://${host}/debugger`, {
      command: "get_socket_ids"
    })
    .pipe(mergeMap((x)=>{
      return from(x);
    }))
    .pipe(map((x)=>{
      const li = $("<li></li>");
      li.append(`<a href="server.html?host=${host}&session_id=${x}" target="_blank">${x}</a>`);
      return li;
    }))
    .pipe(map((x)=>{
      $("#socket_ids").append(x);
    }))
  );
}