import React from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const ForbiddenPage = () => {
    cookies.remove('py_auth_token');
    return <h1>403 Forbidden</h1>;
};