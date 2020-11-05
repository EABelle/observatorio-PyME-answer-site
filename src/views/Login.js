import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    Container,
    TextField
} from '@material-ui/core';
import logo from "../logo.png";
import {isAuthenticated, login} from "../services/LoginService";
import { Redirect } from 'react-router-dom';
import LoadingBar from "../components/LoadingBar";
import { locationShape } from "react-router-props";
import {getRedirectUrl} from "../utils";

const useStyles = makeStyles(theme => ({
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    appLogo: {
        width: 200,
        [theme.breakpoints.down('sm')]: {
            width: 150,
        }
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
        }
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    loginCard: {
        padding: '20px 24px',
        maxWidth: 420
    },
    errorContainer: {
        width: '100%',
        margin: '12px auto',
        textAlign: 'center',
        color: '#f52F41'
    },
    submit: {
        marginTop: '16px',
    }
}));

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectUrl, setRedirectUrl] = useState(getRedirectUrl());
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(email, password);
        } catch(e) {
            setError(e.response ? e.response.data?.message : 'Ocurrió un error');
        }
        if(isAuthenticated()) {
            setRedirectUrl(getRedirectUrl());
        }
        setLoading(false);
    };

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const classes = useStyles();

    if (redirectUrl) {
        return <Redirect to={{ pathname: redirectUrl }} />;
    }

    return (
        <Container component="main" className={classes.container}>
            <div className={classes.formContainer}>
                <img src={logo} className={classes.appLogo} alt="logo" />
                <h2 className={classes.title}>
                    Ingresar a mi cuenta
                </h2>
                <Card className={classes.loginCard}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Ingresar
                        </Button>
                    </form>
                    <LoadingBar show={loading} />
                    <div className={classes.errorContainer}>
                        { error }
                    </div>
                </Card>
            </div>
        </Container>
    )
};

Login.propTypes = {
    location: locationShape
};