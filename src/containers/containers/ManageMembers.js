import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import stringify from "qs-stringify";
import {Redirect} from "react-router-dom";

const ManageMembers = (props) => {

    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState({name: "", id: ""})
    const [members, setMembers] = useState([])
    const [users, setUsers] = useState([])
    const [adding, setAdding] = useState(false)

    const api = useSelector(state => state.api);
    const theme = useSelector(state => state.theme);
    const [isLoggedIn, setIsLoggedIn] = useState(api.userId)
    const userId = api.userId;
    const userToken = api.authToken

    useEffect(() => {
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

    const getChatMembers = async (currChat) => {
        setCurrentChat({id:currChat.id, name:currChat.name})
        await axios({
            method: 'post',
            url: api.address + "/chats/get-chat-members",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': userToken
            },
            data: stringify({
                chat_id: currChat.id,
            }),
        }).then(function (response) {
            if (response.data !== '') {
                let event = response.data
                if (event.status) {
                    setMembers(event.data)
                } else {
                    console.log(event.warning)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    const removeMember = async (id) => {
        await axios({
            method: 'post',
            url: api.address + "/chats/remove-users-from-chat",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': userToken
            },
            data: stringify({
                members_list: [id],
                chat_id: currentChat.id
            }),
        }).then(function (response) {
            if (response.data !== '') {
                let event = response.data
                if (event.status) {
                    getChatMembers(currentChat.id)
                } else {
                    console.log(event.warning)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    const addMember = async (id) => {
        await axios({
            method: 'post',
            url: api.address + "/chats/add-users-to-chat",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': userToken
            },
            data: stringify({
                members_list: [id],
                chat_id: currentChat.id
            }),
        }).then(function (response) {
            if (response.data !== '') {
                let event = response.data
                if (event.status) {
                    getChatMembers(currentChat.id)
                    setAdding(false)
                } else {
                    console.log(event.warning)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    const getAllUsers = async () => {
        await axios({
            method: 'post',
            url: api.address + "/users/get-all-users",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': userToken
            },
        }).then(function (response) {
            if (response.data !== '') {
                let event = response.data
                if (event.status) {
                    console.log(event)
                    setUsers(event.data)
                    setAdding(true)
                } else {
                    console.log(event.warning)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    function renderChats(chatsArr) {
        let divArr = []
        let chat
        for (let key in chatsArr) {
            chat = chatsArr[key]
            let currChat = chat
            divArr.push(
                <div className={'chatElement box-shadow '+theme.siteTheme}
                     onClick={() => getChatMembers(currChat)}
                >
                    <div><p>{chat.name}</p></div>
                </div>
            )
        }
        return divArr
    }

    function renderChatMembers(){
        let divArr = []

        divArr.push(
            <div
                className={'userElement add box-shadow '+theme.siteTheme}
                onClick={() => getAllUsers()}
            >
                <div><h1>+</h1></div>
            </div>
        )


        for(let key in members){
            let user = members[key]

            divArr.push(
                <div className={'userElement box-shadow '+theme.siteTheme}
                     onClick={() => removeMember(user.id)}
                >
                    <div><p>{user.name}</p></div>
                </div>
            )
        }

        return divArr
    }

    function renderAllUsers(){
        let divArr = []

        divArr.push(
            <div
                className={'userElement box-shadow '+theme.siteTheme}
                onClick={() => setAdding(false)}
            >
                <div><h1>x</h1></div>
            </div>
        )

        for(let key in users){
            let user = users[key]

            divArr.push(
                <div className={'userElement add box-shadow '+theme.siteTheme}
                     onClick={() => addMember(user.id)}
                >
                    <div><p>{user.name}</p></div>
                </div>
            )
        }

        return divArr
    }

    if (isLoggedIn) {
        return (
            <div className={'chatPageContainer'}>
                <div className={"chatsMenu"}>
                    <p style={{color: "#afb0b4", fontSize: "25px"}}>Your Chats</p>
                    <div className={'topBorder'}>
                    </div>
                    {renderChats(chats)}
                </div>
                <div className={'activeChat'}>
                    {currentChat.name ? (
                        <div className={'chatWindow'}>
                            <p style={{color: "#afb0b4", fontSize: "25px"}}>{"\""+currentChat.name+"\" members"}</p>
                            <div className={'topBorder'}>
                            </div>
                            <div className={'membersBlock'}>
                                {currentChat ? (adding ? (renderAllUsers()) : (renderChatMembers())) : null}
                            </div>
                        </div>
                    ) : null}

                </div>
            </div>
        )
    } else {
        return <Redirect to={''}/>
    }
}

export default (ManageMembers);