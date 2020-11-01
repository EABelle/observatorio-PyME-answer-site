import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from "../views/Login";
import {PrivateRoute} from "./PrivateRoute";
import MyForms from "../views/MyForms";
import FormView from "../views/FormView";
import UsersView from "../views/UsersView";
import React from "react";
import RolesView from "../views/RolesView";

export function MainRouter() {
    return <Router>
        <Switch>
            <Route path="/login" component={Login}/>
            <PrivateRoute path="/misCuestionarios" component={MyForms}/>
            <PrivateRoute path="/cuestionario/:id" component={FormView}/>
            <PrivateRoute path="/usuarios" component={UsersView}/>
            <PrivateRoute path="/roles" component={RolesView}/>
            <Redirect to={{pathname: "/misCuestionarios"}}/>
        </Switch>
    </Router>;
}