import React, {useEffect, useState} from "react";
import {isAuthenticated, logout} from "../services/LoginService";
import AccountClient from "../api/AccountClient";
import {Redirect, Route} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";
import {getUserFromToken} from "../utils";
import {intersection} from "lodash";

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
const RedirectToDefaultUrl = props => (
    <Redirect to={{
        pathname: props.defaultUrl || '/forbidden',
        state: {from: props.location},
    }}
    />
)
export const PrivateRoute = ({component: Component, permissions, defaultUrl, ...rest}) => {
    const [accountData, setAccountData] = useState();
    const [keepLoggedIn, setKeepLoggedIn] = useState(isAuthenticated());
    const [user, setUser] = useState(getUserFromToken());
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        setKeepLoggedIn(isAuthenticated());
        setUser(getUserFromToken());
    };

    useEffect(() => {
        AccountClient.getMyAccount()
            .then((account) => {
                setAccountData(account);
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    handleLogout();
                }
            });
    }, []);

    return (
        <Route
            {...rest}
            render={(props) => {
                if(!keepLoggedIn) {
                    return <RedirectToLogin location={props.location}/>
                }
                if (!user?.confirmed) {
                    return <RedirectToConfirmUser location={props.location}/>
                }
                if(permissions && permissions.length && !intersection(user?.permissions, permissions).length) {
                    return <RedirectToDefaultUrl location={props.location} defaultUrl={defaultUrl} />
                }
                return (
                    <div>
                        <Header onOpenMenu={() => setIsMenuOpen(true)} />
                        <SideMenu onLogout={handleLogout} account={accountData} location={props.location} isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
                        <Component account={accountData} {...props} />
                    </div>
                )
            }}
        />
    );
}