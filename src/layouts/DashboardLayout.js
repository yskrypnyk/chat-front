import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

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
            <div className={'appBody'}>
                <div className={'navbar'}>
                    <h1>Menu</h1>
                    <div>
                        <div style={{
                            marginTop:10,
                            marginBottom:10
                        }}>
                            <Link style={{borderRadius: "25px"}}
                                  to={"/login"}
                            >
                                Login
                            </Link>
                        </div>

                        <div>
                            <Link style={{borderRadius: "25px"}}
                                  to={"/chat"}
                            >
                                Chat
                            </Link>
                        </div>
                    </div>
                </div>
                {props.children}
            </div>

        </div>
    );
}

export default DashboardLayout;
