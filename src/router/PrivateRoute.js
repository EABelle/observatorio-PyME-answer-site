import React, {useEffect, useState} from "react";
import {isAuthenticated, logout} from "../services/LoginService";
import AccountClient from "../api/AccountClient";
import {Redirect, Route} from "react-router-dom";
import Header from "../components/Header";

const RedirectToLogin = props => (
    <Redirect to={{
        pathname: '/login',
        state: {from: props.location},
    }}
    />
)
export const PrivateRoute = ({component: Component, ...rest}) => {
    const [accountData, setAccountData] = useState();
    const [keepLoggedIn, setKeepLoggedIn] = useState(isAuthenticated());

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
    };

    return (
        <Route
            {...rest}
            render={(props) => keepLoggedIn ? (
                <div>
                    <Header onLogout={handleLogout} account={accountData}/>
                    <Component account={accountData} {...props} />
                </div>
            ) : <RedirectToLogin location={props.location}/>}
        />
    );
}