import { observer } from "mobx-react-lite";
import s from "./ChatRoom.module.sass"
import { FC, useContext, useState } from "react";
import { Context } from "../../index";
import { SocketMessage } from "../../models/SocketMessage";
import uuid from "react-uuid";
import * as Stomp from "stompjs"
import ChatRoomMessage from "../ChatRoomMessage/ChatRoomMessage";


const ChatRoom: FC = () => {

  const {store} = useContext(Context)

  const [messages, setMessages] = useState<SocketMessage[]>([])
  const [message, setMessage] = useState<string>("")
  const [sender, setSender] = useState<string>("")
  const [topicId, setTopicId] = useState<string>("")
  const [subscribed, setSubscribed] = useState<boolean>(false)

  const sendSTOMPMessage = (pth:string, type:string): void => {
    store.stompClient?.send(pth, {}, JSON.stringify({
        sender: sender,
        content: message, 
        type, 
        topicId,
        id: uuid(),
        time: Date.now()
    }))
  }

  const subscribeSTOMPTopic = (topicid:string): void => {
    store.stompClient?.subscribe(`/topic/${topicid}/flow`, (frame: Stomp.Frame | undefined) => {
        
        const newMessage = new SocketMessage(frame);

        setMessages(prevMessages => {
          return [...prevMessages, newMessage];
        })
        
    })
    store.stompClient?.send(`/app/chat/user`, {}, JSON.stringify({
        sender: sender,
        type: "JOIN", 
        topicId,
        id: uuid(),
        time: Date.now()
    }))
    setSubscribed(true);
  }

  return (
    <div className={s.ChatRoom}>
        <div> 
              {
                subscribed 
                  ?
                  <>
                    <input onChange={(e) => setMessage(e.target.value)} placeholder="Enter message"/>
                        <button onClick={() => sendSTOMPMessage("/app/chat/message", "CHAT")}>
                            SEND MESSAGE
                        </button>
                        {
                            messages.map((model:SocketMessage) => <ChatRoomMessage model={model} key={model.id}/>)
                        }
                  </>
                  :
                  <>
                    <button onClick={() => subscribeSTOMPTopic(topicId)}>
                      SUBSCRIBE AND LOGIN
                    </button>
                    <input onChange={(e) => setTopicId(e.target.value)} placeholder="Enter topic id"/>
                    <input onChange={(e) => setSender(e.target.value)} placeholder="ENTER USERNAME"/>
                  </>
              }
            </div>
    </div>
  );
}

export default observer(ChatRoom);
