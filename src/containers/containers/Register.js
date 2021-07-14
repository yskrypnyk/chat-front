import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAuthTokens, setAuthType, setUserId, setUserName} from "../../redux/actions";
import axios from "axios";
import stringify from "qs-stringify";
import {Link, Redirect} from "react-router-dom";

const Register = (props) => {

    const api = useSelector(state => state.api);
    const dispatch = useDispatch();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [realName, setRealName] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(api.userId)

    const register = async () => {
        await axios({
            method: 'post',
            url: api.address + "/users/login",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            data: stringify({
                username: username,
                password: password,
                name: realName
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
                <h1>Register</h1>

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
                        value={realName}
                        onChange={(event)=>{
                            setRealName(event.target.value)
                        }}
                        type="text"
                        placeholder={"Real Name"}
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
                        onClick={()=>register()}
                    >
                        Register
                    </button>

                    <p style={{textAlign:"center", color:"#77787E"}}>I already have an account.
                        <Link style={{textDecoration:"none", color:"#6857C7"}} to={"/login"}> Log in</Link>
                    </p>
                </div>
            </div>
        )
    }
}

export default (Register);