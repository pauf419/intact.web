import * as Stomp from "stompjs"
import { ISocketMessage } from "../interfaces/ISocketMessage";

export class SocketMessage { 
    type: string = "MSG";
    sender: string = "";
    content: string = "";
    id:string = ""
    time:string = ""

    constructor(o:Stomp.Frame | undefined) {
        if(!o) throw Error("Undefined error.")
        switch(o?.command) {
            case "MESSAGE": 
                const parsed: ISocketMessage = JSON.parse(o.body)
                this.type = parsed.type
                this.sender = parsed.sender 
                this.content = parsed.content
                this.id = parsed.id
                this.time = parsed.time
        }
    }
}