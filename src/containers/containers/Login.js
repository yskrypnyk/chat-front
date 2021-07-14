import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAuthTokens, setAuthType, setUserId, setUserName} from "../../redux/actions";
import axios from "axios";
import stringify from "qs-stringify";
import {Link, Redirect} from "react-router-dom";

const Login = (props) => {

    const api = useSelector(state => state.api);
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(api.userId)

    const loginAsRobert = async () => {
        await axios({
            method: 'post',
            url: api.address + "/users/login",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            data: stringify({
                username: "robert",
                password: "robert"
            }),
        }).then(function (response) {
            if (response.data !== '') {
                let event = response.data
                if (event.status) {
                    dispatch(setAuthTokens(event.data.token));
                    dispatch(setUserId("" + event.data.id));
                    dispatch(setUserName("" + event.data.name));
                    window.location.reload(false);
                } else {
                    console.log(event.warning)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    const login = async () => {
        await axios({
            method: 'post',
            url: api.address + "/users/login",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            data: stringify({
                username: username,
                password: password
            }),
        }).then(function (response) {
            if (response.data !== '') {
                let event = response.data
                if (event.status) {
                    dispatch(setAuthTokens(event.data.token));
                    dispatch(setUserId("" + event.data.id));
                    dispatch(setUserName("" + event.data.name));
                    window.location.reload(false);
                } else {
                    console.log(event.warning)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    const loginAsBobert = async () => {
        await axios({
            method: 'post',
            url: api.address + "/users/login",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            data: stringify({
                username: "bobert",
                password: "bobert"
            }),
        }).then(function (response) {
            if (response.data !== '') {
                let event = response.data
                if (event.status) {
                    dispatch(setAuthTokens(event.data.token));
                    dispatch(setUserId("" + event.data.id));
                    dispatch(setUserName("" + event.data.name));
                    window.location.reload(false);
                } else {
                    console.log(event.warning)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    if (isLoggedIn) {
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
                <h1 className={theme.siteTheme+"-text"}>Login</h1>

                <div className={'loginForm'}>
                    <input
                        className={'formInput'}
                        value={username}
                        onChange={(event)=>{
                            setUsername(event.target.value)
                        }}
                        type="text"
                        placeholder={"Username"}
                    />

                    <input
                        className={'formInput'}
                        value={password}
                        onChange={(event)=>{
                            setPassword(event.target.value)
                        }}
                        type="password"
                        placeholder={"Password"}
                    />

                    <button
                        className={"submitButton"}
                        onClick={()=>login()}
                    >
                        Login
                    </button>

                    <p style={{textAlign:"center", color:"#77787E"}}>I dont have an account yet.
                        <Link style={{textDecoration:"none", color:"#6857C7"}} to={"/registration"}> Register</Link>
                    </p>
                </div>

                <div style={{
                    width:300,
                    borderTop:"solid 1px #afb0b4",
                    justifyContent:"center",
                    alignItems:"center",
                    display:"flex",
                    flexDirection:"column",
                }}>
                    <div>
                        <p style={{color:"#afb0b4"}}>Fast login</p>
                    </div>
                    <div>
                        <button
                            className={"smallButton"}
                            onClick={()=>loginAsRobert()}
                        >
                            Robert
                        </button>

                        <button
                            className={"smallButton"}
                            onClick={()=>loginAsBobert()}
                        >
                            Bobert
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Login);