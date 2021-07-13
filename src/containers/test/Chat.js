import React, {useEffect, useState} from "react";
import Yii2WebSockets from "../../libs/yiisockets-core";
import {useSelector} from "react-redux";
import axios from "axios";
import stringify from "qs-stringify";

const Chat = (props) => {

    const userId = 1;
    const userToken = 'swCcYzQUwSDH44-mNW9pcJZaLs2_ruP-' //Local Robert

    let chatId

    const [ws, setWs] = useState('')
    const [text, setText] = useState('')
    const [chats, setChats] = useState([])
    const [messages, setMessages] = useState([])
    const [subscribed, setSubscribed] = useState(false)
    const [currentChat, setCurrentChat] = useState({name: "", id: ""})

    const api = useSelector(state => state.api);
    const theme = useSelector(state => state.theme);

    useEffect(() => {
        sockets()
        console.log(api.address)
        getAvailableChats()
    }, [])

    const getAvailableChats = async () => {
        await axios({
            method: 'post',
            url: api.address + "/chats/get-available-chats",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': userToken
            },
            data: stringify({
                user_id: userId,
            }),
        }).then(function (response) {
            if (response.data !== '') {
                let event = response.data
                if (event.status) {
                    setChats(event.data)
                } else {
                    console.log(event.warning)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    const getChatData = async (chat_id) => {
        await axios({
            method: 'post',
            url: api.address + "/chats/get-chat-data",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': userToken
            },
            data: stringify({
                chat_id: chat_id,
                offset: 0,
                messages_limit: 50
            }),
        }).then(function (response) {
            if (response.data !== '') {
                let event = response.data
                if (event.status) {
                    console.log(event.data)
                    setMessages(event.data)
                    setSubscribed(true)
                } else {
                    console.log(event.warning)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    function subscribeToChat(chat) {
        setCurrentChat({id:chat.id, name:chat.name})
        ws.socketSend('chat/subscribe-chat', {'chat_id': chat.id});
        getChatData(chat.id)
    }

    function sockets() {
        let login_tokens = {'login-token': userToken, 'connection-type': 'user'};
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

    function sendMessage() {
        let userId = api.userId;
        //action to trigger
        ws.socketSend('chat/send', {'text': text, 'user_id': userId, 'chat_id': currentChat.id});
        getChatData(currentChat.id)
        setText('')

    }

    function renderChats(chatsArr) {
        let divArr = []
        let chat
        for (let key in chatsArr) {
            chat = chatsArr[key]
            divArr.push(
                <div className={'chatElement box-shadow'}
                     onClick={() => subscribeToChat(chat)}
                >
                    <div className={'chatImage'}><p>chatImg</p></div>
                    <div><p>{chat.name}</p></div>
                </div>
            )
        }
        return divArr
    }

    function renderMessages(messages) {
        let divArr = []
        let obj
        for (let key in messages) {
            obj = messages[key]
            divArr.push(
                <div className={ (userId == obj.sender_id ? "myMessage " : '') + 'messageContainer'}>
                    <p style={{color: "#afb0b4", fontSize: "12px"}}>{obj.sender_name}</p>
                    <div><p style={{fontSize: "15px"}}>{obj.message}</p></div>
                </div>
            )
        }

        return divArr
    }

    return (
        <div className={'chatPageContainer'}>
            <div className={"chatsMenu"}>
                <p style={{color: "#afb0b4", fontSize: "25px"}}>Available Chats</p>
                <div className={'topBorder'}>
                </div>
                {renderChats(chats)}
            </div>
            <div className={'activeChat'}>
                {subscribed ? (
                    <>
                        <div className={'chatWindow'}>
                            <p style={{color: "#afb0b4", fontSize: "25px"}}>{currentChat.name}</p>
                            <div className={'topBorder'}>
                            </div>
                            <div className={'messageBlock'}>
                                {renderMessages(messages)}
                            </div>
                        </div>
                        <div className="inputBox">
                            <input
                                className={'textInput'}
                                placeholder={"Write something"}
                                type="text"
                                value={text}
                                onChange={
                                    (event) => {
                                        setText(event.target.value)
                                    }}/>
                        </div>
                        <div className={'sendButton'}>
                            <button onClick={() => sendMessage()}>Send</button>
                        </div>
                    </>
                ) : (
                    <>

                    </>
                )}
            </div>
        </div>
        // <div>
        //     <h1>Chat as {api.userName}</h1>
        //     <div>
        //         <input type="text" onChange={(event)=>{
        //             setText(event.target.value)
        //         }}/>
        //     </div>
        //     <div>
        //         <button onClick={()=>sendMessage()}>send message</button>
        //     </div>
        //     <div>
        //         <button onClick={()=>subscribeToChat(chatId)}>subscribe to chat</button>
        //     </div>
        //     <Link style={{borderRadius: "25px"}} to={"/"}>Back</Link>
        // </div>
    )
}

export default (Chat);