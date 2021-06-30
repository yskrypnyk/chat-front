import React from "react";

const Main = (props) => {
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <div>
                <h1>Main</h1>
                <div>
                    <div style={{marginTop:10, marginBottom:10}}>
                        <a style={{borderRadius: "25px"}} href={"/login"}>Login</a>
                    </div>
                    <div>
                        <a style={{borderRadius: "25px"}} href={"/chat"}>Chat</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default (Main);