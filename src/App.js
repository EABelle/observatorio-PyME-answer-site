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
import Header from "./components/Header";
import MyForms from "./views/MyForms";
import FormView from "./views/FormView";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            <div>
                <Header />
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
                    <PrivateRoute path="/misCuestionarios" component={MyForms} />
                    <PrivateRoute path="/cuestionario/:id" component={FormView} />
                    <Redirect to={{ pathname: '/misCuestionarios' }} />
                </Switch>
            </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;
