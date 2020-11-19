import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from "../views/Login";
import {PrivateRoute} from "./PrivateRoute";
import MyForms from "../views/MyForms";
import PollView from "../views/PollView";
import UsersView from "../views/UsersView";
import React from "react";
import RolesView from "../views/RolesView";
import PollsAdminView from "../views/PollsAdminView";
import TemplatesView from "../views/TemplatesView";
import TemplateView from "../views/TemplateView";
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
            <PrivateRoute path="/misCuestionarios" permissions={["ANSWER"]} component={MyForms}/>
            <PrivateRoute path="/cuestionario/:id" permissions={["ANSWER", "MANAGE_POLLS"]} component={PollView}/>
            <PrivateRoute path="/usuarios" permissions={["MANAGE_USERS"]} component={UsersView}/>
            <PrivateRoute path="/roles" permissions={["MANAGE_USERS"]} component={RolesView}/>
            <PrivateRoute path="/cuestionarios" permissions={["MANAGE_POLLS"]} component={PollsAdminView}/>
            <PrivateRoute path="/plantillas" permissions={["MANAGE_POLLS"]} component={TemplatesView}/>
            <PrivateRoute path="/plantilla/:id" permissions={["MANAGE_POLLS"]} component={TemplateView}/>
            <Redirect to={{pathname: "/login"}}/>
        </Switch>
    </Router>;
}