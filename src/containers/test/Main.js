import React from "react";
import {Link} from "react-router-dom";

const Main = (props) => {
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <div>
                <h1>Main</h1>
                <div>
                    <div style={{marginTop:10, marginBottom:10}}>
                        <Link style={{borderRadius: "25px"}} to={"/login"}>Login</Link>
                    </div>
                    <div>
                        <Link style={{borderRadius: "25px"}} to={"/chat"}>Chat</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default (Main);