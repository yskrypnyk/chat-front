import './App.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import DashboardLayout from "./layouts/DashboardLayout";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PageNotFound from "./containers/base/PageNotFound";
import Main from "./containers/containers/Main";
import Login from "./containers/containers/Login";
import Chat from "./containers/containers/Chat";
import Register from "./containers/containers/Register";
import Settings from "./containers/containers/Settings";
import CreateChat from "./containers/containers/CreateChat";
import ManageMembers from "./containers/containers/ManageMembers";

function App() {


    return (
        <Provider store={store}>
            <Router>
                <DashboardLayout>
                    <Switch>
                        <Route exact path='/' component={Main}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/registration" component={Register}/>
                        <Route exact path="/chat" component={Chat}/>
                        <Route exact path="/settings" component={Settings}/>
                        <Route exact path="/chat" component={Chat}/>
                        <Route exact path="/create-chat" component={CreateChat}/>
                        <Route exact path="/manage-members" component={ManageMembers}/>
                        <Route path="*">
                            <PageNotFound/>
                        </Route>
                    </Switch>
                </DashboardLayout>
            </Router>
        </Provider>
    );
}

export default App;
