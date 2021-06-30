import './App.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import DashboardLayout from "./layouts/DashboardLayout";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PageNotFound from "./containers/base/PageNotFound";
import Main from "./containers/test/Main";
import Login from "./containers/test/Login";
import Chat from "./containers/test/Chat";

function App() {


    return (
        <Provider store={store}>
            <Router>
                <DashboardLayout>
                    <Switch>
                        <Route exact path='/' component={Main}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/chat" component={Chat}/>
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
