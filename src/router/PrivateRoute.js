import React, {useEffect, useState} from "react";
import {isAuthenticated, logout} from "../services/LoginService";
import AccountClient from "../api/AccountClient";
import {Redirect, Route} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {getUserFromToken} from "../utils";
import ConfirmUser from "../views/ConfirmUser";

const RedirectToLogin = props => (
    <Redirect to={{
        pathname: '/login',
        state: {from: props.location},
    }}
    />
)

const RedirectToConfirmUser = props => (
    <Redirect to={{
        pathname: '/confirmarUsuario',
        state: {from: props.location},
    }}
    />
)
export const PrivateRoute = ({component: Component, ...rest}) => {
    const [accountData, setAccountData] = useState();
    const [keepLoggedIn, setKeepLoggedIn] = useState(isAuthenticated());
    const [user, setUser] = useState(getUserFromToken());

    useEffect(() => {
        AccountClient.getMyAccount()
            .then((account) => {
                setAccountData(account);
            })
            .catch(err => {
                if (err.response && err.response.status === 403) {
                    logout();
                    setKeepLoggedIn(isAuthenticated());
                }
            });
    }, []);

    const handleLogout = () => {
        logout();
        setKeepLoggedIn(isAuthenticated());
        setUser(getUserFromToken());
    };

    return (
        <Route
            {...rest}
            render={(props) => keepLoggedIn ?
                user?.confirmed ?
                    (
                    <div>
                        <Header onLogout={handleLogout} account={accountData}/>
                        <Component account={accountData} {...props} />
                        <Footer />
                    </div>
                    )
                    : <RedirectToConfirmUser location={props.location} />
                    : <RedirectToLogin location={props.location} />}
        />
    );
}