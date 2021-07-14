import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";

const DashboardLayout = (props) => {
    const api = useSelector(state => state.api);
    const theme = useSelector(state => state.theme);
    const [isLoggedIn, setIsLoggedIn] = useState(api.userId)

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        localStorage.removeItem("userId")
        window.location.reload(false);
    }

    return (
        <div className={"bodyDiv " + theme.siteTheme + "-body"}>
            <div className={'appBody'}>
                <div className={'navbar ' + theme.siteTheme}>
                    <h1 className={'menuHeader ' + theme.siteTheme}>Menu</h1>
                    {isLoggedIn ? (
                        <>
                            <NavLink
                                activeClassName={'menu-active ' + theme.siteTheme}
                                className={'menuLink ' + theme.siteTheme}
                                to={"/chat"}
                            >
                                Chat
                            </NavLink>

                            <NavLink
                                activeClassName={'menu-active ' + theme.siteTheme}
                                className={'menuLink ' + theme.siteTheme}
                                to={"/chat-create"}
                            >
                                Create Chat
                            </NavLink>

                            <NavLink
                                activeClassName={'menu-active ' + theme.siteTheme}
                                className={'menuLink ' + theme.siteTheme}
                                to={"/settings"}
                            >
                                Settings
                            </NavLink>

                            <Link
                                className={'menuLink ' + theme.siteTheme}
                                onClick={()=>logout()}
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                      <>
                          <NavLink
                              activeClassName={'menu-active ' + theme.siteTheme}
                              className={'menuLink ' + theme.siteTheme}
                              to={"/login"}
                          >
                              Login
                          </NavLink>
                          <NavLink
                              activeClassName={'menu-active ' + theme.siteTheme}
                              className={'menuLink ' + theme.siteTheme}
                              to={"/settings"}
                          >
                              Settings
                          </NavLink>
                      </>
                    )}
                </div>
                {props.children}
            </div>

        </div>
    );
}

export default DashboardLayout;
