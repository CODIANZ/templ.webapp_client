import { ExtURL } from "./ExtURL";
import { RxUtil } from "./RxUtil";
import { mergeMap, map } from "rxjs/operators";
import { from } from "rxjs";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";

const args = new ExtURL(document.URL);
const host = args.getQueryParameter("host");
const session_id = args.getQueryParameter("session_id");


$(document).ready(()=>{
  $("#session_id").text(session_id!);
  document.title = `server: ${session_id}`;

  $("#server_socket")
    .attr("href", `server_socket.html?session_id=${session_id}&host=${host}`);

  $("#emit_unsolicited_message").on("click", ()=>{
    RxUtil.doSubscribe("emit_unsolicited_message", RxUtil.postJson(`http://${host}/debugger`, {
      command: "emit_unsolicited_message",
      session_id: session_id,
      message: {
        event: $("#message_event").val() as string,
        body: JSON.parse($("#message_body").val() as string)
      }
    }), log);
  });

  $("#emit_solicited_message").on("click", ()=>{
    RxUtil.doSubscribe("emit_solicited_message", RxUtil.postJson(`http://${host}/debugger`, {
      command: "emit_solicited_message",
      session_id: session_id,
      message: {
        event: $("#message_event").val() as string,
        body: JSON.parse($("#message_body").val() as string)
      }
    }), log);
  });

  $("#update_pending_solicited_messages").on("click", ()=>{
    doUpdatePendingSolicitedMessages();
  });

  $("#goodbye").on("click", ()=>{
    RxUtil.doSubscribe("goodbye", RxUtil.postJson(`http://${host}/debugger`, {
      command: "goodbye",
      session_id: session_id
    }), log);
  });

  doUpdatePendingSolicitedMessages();
});

function log(s: string){
  $("#log").text($("#log").text() + `${s}\n\n`);
}

function doUpdatePendingSolicitedMessages(){
  $(".list_item.template").nextAll().remove();
  RxUtil.doSubscribe("get_pending_solicited_messages",
    RxUtil.postJson(`http://${host}/debugger`, {
      command: "get_pending_solicited_messages",
      session_id: session_id
    })
    .pipe(mergeMap((x)=>{
      return from(Object.entries(x).map(([k,v]) => ({[k]:v})));
    }))
    .pipe(map((x)=>{
      const li = $(".list_item.template").clone().removeClass("template");
      const key = Object.keys(x)[0];
      const value = Object.values(x)[0] as any;
      const solicited_message_index = parseInt(key);
      const solicited_message_event = value.event as string;
      const solicited_message_body  = value.body as any;

      $(".index", li).val(solicited_message_index);
      $(".message.event", li).val(solicited_message_event);
      $(".message.body", li).val(JSON.stringify(solicited_message_body, null, 1));
      $(".emit", li).on("click", ()=>{
        RxUtil.doSubscribe("emit_solicited_response", RxUtil.postJson(`http://${host}/debugger`, {
          command: "emit_solicited_response",
          session_id: session_id,
          message: {
            index: solicited_message_index,
            event: $(".response.event", li).val() as string,
            body: JSON.parse($(".response.body", li).val() as string)
          }
        }), log);
      });

      return li;
    }))
    .pipe(map((x)=>{
      $("#pending_solicited_messages").append(x);
      x.show();
    }))
  );
}