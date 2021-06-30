import {SET_AUTH_TOKENS, SET_AUTH_TYPE, SET_USER_ID, SET_USER_NAME} from "../actions/actionTypes";
const IS_DEV = true;
let startAddress = 'https://';
let cleanAddress = '';
let socketAddress = '';
let socketPort = '';
let socketMode = '';
let socketRoute = '';

if(!IS_DEV) {
    cleanAddress = '';
} else {
    startAddress = 'http://';
    cleanAddress = 'localhost:8080';
    socketAddress = 'localhost';
    socketPort = '8088';
    socketMode = 'ws';
    socketRoute = '';

}

const initialState = {
    authToken: '',
    authType: '',
    userName: '',
    userId: '',
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
