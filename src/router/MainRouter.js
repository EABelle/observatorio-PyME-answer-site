import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from "../views/Login";
import {PrivateRoute} from "./PrivateRoute";
import MyForms from "../views/MyForms";
import FormView from "../views/FormView";
import UsersView from "../views/UsersView";
import React from "react";
import RolesView from "../views/RolesView";
import PollsAdminView from "../views/PollsAdminView";
import TemplatesView from "../views/TemplatesView";
import ConfirmUser from "../views/ConfirmUser";
import {ForbiddenPage} from "../views/errorPages/forbidden";
import {NotFoundPage} from "../views/errorPages/not-found";

export function MainRouter() {
    return <Router>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/confirmarUsuario" component={ConfirmUser}/>
            <Route path="/notFound" component={NotFoundPage}/>
            <PrivateRoute path="/forbidden" component={ForbiddenPage}/>
            <PrivateRoute path="/misCuestionarios" permission="ANSWER" component={MyForms}/>
            <PrivateRoute path="/cuestionario/:id" permission="ANSWER" component={FormView}/>
            <PrivateRoute path="/usuarios" permission="MANAGE_USERS" component={UsersView}/>
            <PrivateRoute path="/roles" permission="MANAGE_USERS" component={RolesView}/>
            <PrivateRoute path="/cuestionarios" permission="MANAGE_POLLS" component={PollsAdminView}/>
            <PrivateRoute path="/plantillas" permission="MANAGE_POLLS" component={TemplatesView}/>
            <Redirect to={{pathname: "/login"}}/>
        </Switch>
    </Router>;
}