import { observer } from "mobx-react-lite";
import s from "./sass/cmps/App.module.sass"
import { FC, useContext, useState } from "react";
import { Context } from "./index";
import Header from "./components/Header/Header";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs"
import ChatRoom from "./components/ChatRoom/ChatRoom";


const App: FC = () => {

  const {store} = useContext(Context)

  const [protocolFlow, setProtocolFlow] = useState<string[]>([])

  const initializeSTOMPConnection = (url: string)=>  {
    const socket = new SockJS(url);
    store.stompClient = Stomp.over(socket);
    store.stompClient.debug = (e:string) => setProtocolFlow(prevFlow => {
      return [...prevFlow, e]
    });

    store.stompClient.connect({}, (frame: Stomp.Frame | undefined) => {

    }, (e: Stomp.Frame | string)=> {
        console.error("ERR: " + e)
    })
  } 

  return (
    <div className={s.App}>
      <Header/>
      <div className={s.AppWrapper}>
        <div className={s.AppContainer}>
          {
            store.stompClient
              ? 
              <ChatRoom/>
              : 
              <button onClick={() => initializeSTOMPConnection("http://localhost:8080/ws")}>
                CONNECT
              </button>
          }
        </div>
        <div className={s.FlowWrapper}> 
          {
            protocolFlow.map((flow:string) => <div className={s.FlowChart} key={flow}>{flow}</div>)
          }
        </div>
      </div>
    </div>
  );
}

export default observer(App);
