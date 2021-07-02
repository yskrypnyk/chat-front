import React, {useEffect, useState} from "react";
import Yii2WebSockets from "../../libs/yiisockets-core";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Chat = (props) => {

    const [ws, setWs] = useState('')
    const api = useSelector(state => state.api);

    useEffect(()=>{
        console.log(api)
        sockets()
    },[])

    function sockets () {
        let login_tokens = {'login-token': api.authToken, 'connection-type': 'user'};
        let _ws = new Yii2WebSockets(login_tokens);

        _ws.connect(api.socketAddress, api.socketPort, api.socketMode, api.socketRoute);

        _ws.addAction('get-new-text', function (data) {
            console.log(data)
        });

        setWs(_ws)
    }

    function sendMessage () {
        let userId = api.userId;
        ws.socketSend('chat/test', {'text': userId});
    }


    return (
        <div>
            <h1>Chat</h1>
            <button onClick={()=>sendMessage()}>adad</button>
            <Link style={{borderRadius: "25px"}} to={"/"}>Back</Link>
        </div>
    )
}

export default (Chat);