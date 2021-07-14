import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSiteTheme} from "../../redux/actions";

const Settings = (props) => {

    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const [currentTheme, setCurrentTheme] = useState(theme.siteTheme)

    function changeTheme() {
        if (currentTheme === 'light') {
            dispatch(setSiteTheme('dark'))
            setCurrentTheme('dark')
            console.log(theme)
        } else {
            dispatch(setSiteTheme('light'))
            setCurrentTheme('light')
        }
        // window.location.reload(false);
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "87%"
        }}>
            <div className="toggle">
                <input
                    type="checkbox"
                    id="toggle"
                    onClick={() => changeTheme()}
                    defaultChecked={currentTheme === "dark"}
                />
                <label htmlFor="toggle">
                    <div className="slide"></div>
                </label>
            </div>
        </div>

    )
}

export default (Settings);