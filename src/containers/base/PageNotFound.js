import React from "react";

const PageNotFound = (props) => {
    return (
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:"87%",
            flexDirection:"column"
        }}>
            <h2>404! Sorry, this page does not seem to exist</h2>
            <a style={{borderRadius: "25px"}} href={"/"}>Back</a>
        </div>

    )
}

export default (PageNotFound);