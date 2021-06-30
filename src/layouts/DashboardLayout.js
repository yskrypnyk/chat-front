import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

const DashboardLayout = (props) => {
    const api = useSelector(state => state.api);
    const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    useEffect(() => {
        checkLoggedIn()
    })


    const checkLoggedIn = () => {
        console.log(api)
        if (api.authToken) {
            return true;
        } else {
            return false;
        }
    }

    const checkAuthType = (types) => {
        return (types === api.authType) ? true : (types.includes(api.authType));
    }

    // const logout = async () => {
    //     await axios({
    //         method: 'get',
    //         url: api.address + "/default/logout",
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //             'Authorization': 'Bearer ' + api.authToken
    //         }
    //     }).then(function (response) {
    //         if (response.data !== '' && response.data.constructor === Object) {
    //             setIsLoggedIn(false)
    //             localStorage.removeItem("privateToken");
    //             localStorage.removeItem("phone");
    //             localStorage.removeItem("email");
    //
    //             console.log(localStorage.hasOwnProperty("privateToken"))
    //
    //             dispatch(setAuthStatus(false));
    //             dispatch(setPrivateToken(''));
    //             dispatch(setPhone(''));
    //
    //             setIsMobileMenuVisible(false)
    //         }
    //     }).catch(function (error) {
    //         // Alert.alert(error.message)
    //     });
    // }

    return (
        <div style={{backgroundColor:"#ebebeb"}}>
            {props.children}
        </div>
    );
}

export default DashboardLayout;
