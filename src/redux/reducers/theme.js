import {SET_SITE_THEME} from "../actions/actionTypes";

const initialState = {
    isDarkTheme: false
};

const theme = (state = initialState, action) => {
    switch (action.type) {
        case SET_SITE_THEME:{
            //here can be additional code
            localStorage.setItem("site_theme", action.data);
            return {
                ...state,
                isDarkTheme: action.data
            };
        }
        default:
            return state;
    }
}

export default theme;