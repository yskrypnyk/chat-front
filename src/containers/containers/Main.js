import React from "react";
import {useSelector} from "react-redux";

const Main = (props) => {
    const theme = useSelector(state => state.theme);
    return (
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:"87%"
        }}>
            <h1 className={theme.siteTheme+"-text"}>
                Welcome to WebChat
            </h1>
        </div>

    )
}

export default (Main);