import {SET_AUTH_TOKENS, SET_AUTH_TYPE, SET_USER_ID, SET_USER_NAME} from "../actions/actionTypes";
const IS_DEV = false;
let startAddress = 'https://';
let cleanAddress = '';
let socketAddress = '';
let socketPort = '';
let socketMode = '';
let socketRoute = '';

let localToken = localStorage.getItem("token");
let localUserName = localStorage.getItem("userName");
let localUserId = localStorage.getItem("userId");


if(!IS_DEV) {
    startAddress = 'https://';
    cleanAddress = 'chat.vallsoft.com';
    socketAddress = 'chat.vallsoft.com';
    socketPort = '443';
    socketMode = 'wss';
    socketRoute = 'wss';
} else {
    startAddress = 'http://';
    cleanAddress = 'localhost:8080';
    socketAddress = 'localhost';
    socketPort = '8089';
    socketMode = 'ws';
    socketRoute = '';
}

const initialState = {
    authToken: localToken ? localToken : "",
    userName: localUserName ? localUserName : "",
    userId: localUserId ? localUserId : "",
    address:  startAddress+cleanAddress+'/api',
    cleanAddress: startAddress+cleanAddress,
    socketAddress : socketAddress,
    socketPort: socketPort,
    socketMode: socketMode,
    socketRoute: socketRoute,
    screen: '1'
};

const api = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKENS:
            localStorage.setItem("token", action.data);
            return {
                ...state,
                authToken: action.data
            };
        case SET_AUTH_TYPE:
            return {
                ...state,
                authType: action.data
            };
        case SET_USER_NAME:
            localStorage.setItem("userName", action.data);
            return {
                ...state,
                userName: action.data
            };
        case SET_USER_ID:{
            localStorage.setItem("userId", action.data);
            return {
                ...state,
                userId: action.data
            };
        }
        default:
            return state;
    }
};

export default api;
