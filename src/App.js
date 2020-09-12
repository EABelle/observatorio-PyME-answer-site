import React from 'react';
import './App.css';
import Login from "./views/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            <div>
                <Component {...props} />
            </div>
        )}
    />
);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(57, 170, 184)',
            contrastText: 'white',
        },
    },
});

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/myQuestionnaires" component={() => (<div>My Questionnaire</div>)} />
                    <Redirect to={{ pathname: '/myQuestionnaires' }} />
                </Switch>
            </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;
