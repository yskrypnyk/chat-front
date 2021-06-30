import {
    SET_AUTH_TOKENS,
    SET_AUTH_TYPE,
    SET_USER_NAME,
    SET_USER_ID
} from "./actionTypes";

export const setAuthTokens = (data) => ({
    type: SET_AUTH_TOKENS,
    data: data
});

export const setAuthType = (data) => ({
    type: SET_AUTH_TYPE,
    data: data
});

export const setUserName = (data) => ({
    type: SET_USER_NAME,
    data: data
});

export const setUserId = (data) => ({
    type: SET_USER_ID,
    data: data
});


