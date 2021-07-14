import React from "react";
import {useSelector} from "react-redux";

const PageNotFound = (props) => {

    const theme = useSelector(state => state.theme);

    return (
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:"87%",
            flexDirection:"column"
        }}>
            <h2 className={theme.siteTheme+"-text"}>404! Sorry, this page does not seem to exist</h2>
        </div>

    )
}

export default (PageNotFound);