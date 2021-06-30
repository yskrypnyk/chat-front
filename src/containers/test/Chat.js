import React, {useEffect, useState} from "react";
import Yii2WebSockets from "../../libs/yiisockets-core";
import {useSelector} from "react-redux";

const Chat = (props) => {

    const [ws, setWs] = useState('')
    const api = useSelector(state => state.api);

    useEffect(()=>{
        // sockets()
    })

    function sockets () {
        let login_tokens = {'login-token': api.authToken, 'connection-type': 'user'};
        let _ws = new Yii2WebSockets(login_tokens);

        _ws.connect(api.socketAddress, api.socketPort, api.socketMode, api.socketRoute);

        _ws.addAction('new-message', function (data) {
            console.log(data)
        });

        setWs(_ws)
    }

    function sendMessage () {
        let userId = api.userId;
        ws.socketSend('users/send-message', {'userId': userId});
    }


    return (
        <div>
            <h1>Chat</h1>
            <a style={{borderRadius: "25px"}} href={"/"}>Back</a>
        </div>
    )
}

export default (Chat);