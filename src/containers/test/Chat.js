import React, {useEffect, useState} from "react";
import Yii2WebSockets from "../../libs/yiisockets-core";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Chat = (props) => {

    const [ws, setWs] = useState('')
    const [text, setText] = useState('')
    const api = useSelector(state => state.api);
    const chatId = 1;

    useEffect(()=>{
        sockets()
    },[])

    function subscribeToChat(chat_id){
        ws.socketSend('chat/subscribe-chat', {'chat_id':chat_id});
    }

    function sockets () {
        let login_tokens = {'login-token': api.authToken, 'connection-type': 'user'};
        let _ws = new Yii2WebSockets(login_tokens);

        _ws.connect(api.socketAddress, api.socketPort, api.socketMode, api.socketRoute);
        //action to listen
        _ws.addAction('new-message', function (data) {
            console.log(data)
        });
        _ws.addAction('status', function (data) {
            console.log(data)
        });
        setWs(_ws)
    }

    function sendMessage () {
        let userId = api.userId;
        //action to trigger
        ws.socketSend('chat/send', {'text': text, 'user_id':userId, 'chat_id':chatId});
        setText('')
    }


    return (
        <div>
            <h1>Chat as {api.userName}</h1>
            <div>
                <input type="text" onChange={(event)=>{
                    setText(event.target.value)
                }}/>
            </div>
            <div>
                <button onClick={()=>sendMessage()}>send message</button>
            </div>
            <div>
                <button onClick={()=>subscribeToChat(chatId)}>subscribe to chat</button>
            </div>
            <Link style={{borderRadius: "25px"}} to={"/"}>Back</Link>
        </div>
    )
}

export default (Chat);