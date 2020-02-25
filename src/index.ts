import { RxUtil } from "./RxUtil";
import { mergeMap, map } from 'rxjs/operators';
import { from } from "rxjs";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";

const host = "localhost:50555";

$(document).ready(()=>{
  $("#client").attr("href", `client.html?host=${host}`);
  $("#update").on("click", ()=>{
    doUpdate();
  });
  doUpdate();
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
      return $("<a></a>")
        .attr("href", `server.html?host=${host}&session_id=${x}`)
        .attr("target", "_blank")
        .addClass("list-group-item")
        .addClass("list-group-item-action")
        .text(x as string);
    }))
    .pipe(map((x)=>{
      $("#socket_ids").append(x);
    }))
  );
}