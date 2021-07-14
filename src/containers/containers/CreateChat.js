import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAuthTokens, setAuthType, setUserId, setUserName} from "../../redux/actions";
import axios from "axios";
import stringify from "qs-stringify";
import {Link, Redirect} from "react-router-dom";

const CreateChat = (props) => {

    const api = useSelector(state => state.api);
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const [chatName, setChatName] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(api.userId)
    const [warning, setWarning] = useState('')
    const [success, setSuccess] = useState(false)

    const createChat = async () => {
        setWarning('')
        setSuccess(false)
        await axios({
            method: 'post',
            url: api.address + "/chats/create-chat",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': api.authToken
            },
            data: stringify({
                name: chatName,
                user_id: api.userId
            }),
        }).then(function (response) {
            if (response.data !== '') {
                let event = response.data
                if (event.status) {
                    setSuccess(true)
                } else {
                    setWarning(event.warning)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    if (!isLoggedIn) {
        return <Redirect to={''}/>;
    } else {
        return (
            <div style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"87%"
            }}>
                <h1 className={theme.siteTheme+"-text"}>Create chat</h1>

                <div className={'loginForm'}>
                    <input
                        className={'formInput'}
                        value={chatName}
                        onChange={(event)=>{
                            setChatName(event.target.value)
                        }}
                        type="text"
                        placeholder={"Chat Name"}
                    />

                    <button
                        className={"submitButton"}
                        onClick={()=>createChat()}
                    >
                        Create
                    </button>
                    {warning ? (
                        <div>
                            <p className={theme.siteTheme+"-text warning"}>{warning}</p>
                        </div>
                    ) : null}

                    {success ? (
                        <div>
                            <p className={theme.siteTheme+"-text success"}>Successfully created a chat</p>
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }
}

export default (CreateChat);