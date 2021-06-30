import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAuthTokens, setAuthType, setUserId, setUserName} from "../../redux/actions";
import axios from "axios";
import stringify from "qs-stringify";

const Login = (props) => {

    const api = useSelector(state => state.api);
    const dispatch = useDispatch();

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
                    dispatch(setAuthType(event.data.authType));
                    dispatch(setUserName("" + event.data.name));
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
                    dispatch(setAuthType(event.data.authType));
                    dispatch(setUserName("" + event.data.name));
                } else {
                    console.log(event.warning)
                }
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    return (
        <div>
            <h1>Login</h1>
            <a style={{borderRadius: "25px"}} href={"/"}>Back</a>
            <br/>
            <button onClick={()=>loginAsRobert()}>Robert</button>
            <button onClick={()=>loginAsBobert()}>Bobert</button>
        </div>

    )
}

export default (Login);