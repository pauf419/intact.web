import { observer } from "mobx-react-lite";
import s from "./ChatRoomMessage.module.sass"
import { FC, useContext, useState } from "react";
import { Context } from "../../index";
import { SocketMessage } from "../../models/SocketMessage";
import uuid from "react-uuid";
import * as Stomp from "stompjs"
import { ISocketMessage } from "../../interfaces/ISocketMessage";

interface Props {   
    model:ISocketMessage
}

const ChatRoomMessage: FC<Props> = ({model}) => {

  const {store} = useContext(Context)

  return (
    <div className={s.ChatRoomMessage}>
        {`|${model.type}|[${model.sender}]: ${model.content}`}
    </div>
  );
}

export default observer(ChatRoomMessage);
