import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

const DashboardLayout = (props) => {
    const api = useSelector(state => state.api);
    const theme = useSelector(state => state.theme);

    useEffect(() => {
        checkLoggedIn()
    })


    const checkLoggedIn = () => {
        console.log(api)
    }

    return (
        <div className={"bodyDiv "+theme.siteTheme+"-body"}>
            {props.children}
        </div>
    );
}

export default DashboardLayout;
