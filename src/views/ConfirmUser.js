import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    Container,
    TextField
} from '@material-ui/core';
import logo from "../logo.png";
import LoadingBar from "../components/LoadingBar";
import { locationShape } from "react-router-props";
import UserService from "../services/UserService";
import {getRedirectUrl, getUserFromToken} from "../utils";
import Cookies from 'universal-cookie';
import {Redirect} from "react-router-dom";
const cookies = new Cookies();

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

export default function ConfirmUser() {

    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = useState(getUserFromToken());
    const [redirectToIndex, setRedirectToIndex] = useState(Boolean(getUserFromToken()?.confirmed));
    const id = user?.id;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const token = await UserService.confirmUser(id, password);
            cookies.set('py_auth_token', token);
            setRedirectToIndex(true);
        } catch(e) {
            setError(e.response ? e.response.data?.message : 'Ocurrió un error');
        }
        setLoading(false);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const classes = useStyles();

    if (redirectToIndex === true) {
        return <Redirect to={{ pathname: getRedirectUrl() }} />;
    }

    return (
        <Container component="main" className={classes.container}>
            <div className={classes.formContainer}>
                <img src={logo} className={classes.appLogo} alt="logo" />
                <h2 className={classes.title}>
                    Confirmá tu usuario cambiando tu contraseña
                </h2>
                <Card className={classes.loginCard}>
                    <form className={classes.form} onSubmit={handleSubmit}>
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
                            Confirmar
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

ConfirmUser.propTypes = {
    location: locationShape
};