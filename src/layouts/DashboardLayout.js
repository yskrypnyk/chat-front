import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

const DashboardLayout = (props) => {
    const api = useSelector(state => state.api);

    useEffect(() => {
        checkLoggedIn()
    })


    const checkLoggedIn = () => {
        console.log(api)
    }

    return (
        <div style={{backgroundColor:"#ebebeb"}}>
            {props.children}
        </div>
    );
}

export default DashboardLayout;
