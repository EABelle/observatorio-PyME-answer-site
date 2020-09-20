
import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Container, Typography} from '@material-ui/core';
import {useHistory, useParams} from "react-router-dom";
import FormService from "../services/FormService";
import LoadingBar from "../components/LoadingBar";
import FormQuestion from "../components/FormQuestion";
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Pdf from 'react-to-pdf';
import {STATUS} from "../constants";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 24,
        [theme.breakpoints.up('lg')]: {
            marginTop: 24
        },
        maxWidth: 800
    },
    mapContainer: {
        width: '50%'
    },
    title: {
        marginBottom: 24
    },
    FABs: {
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 250
    },
    FABContainer: {
        position: 'relative',
        width: '100%'
    },
    FAB: {
        float: 'right',
        marginTop: 8,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default () => {

    const classes = useStyles();
    let { id: formId } = useParams();
    useEffect(() => {
        fetchForm();
    }, []);

    const [ form, setForm ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [canSend, setCanSend] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const history = useHistory();
    const ref = React.createRef();

    const fetchForm = () => {
        setError(false);
        setLoading(true);
        FormService.getFormById(formId)
            .then(({data}) => {
                setLoading(false);
                setForm(data);
                setCanSend(isComplete(data));
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    };

    const handleFormChange = (value, index, groupIndex) => {
        if (groupIndex !== undefined) {
            form.questions[index].questions[groupIndex].value = value;
        } else {
            form.questions[index].value = value;
        }
        setForm({...form});
        setCanSend(isComplete(form))
    }

    const isEmpty = (question) => (
        question.value === undefined ||
        question.value === null ||
        question.value === ''
    );

    const isComplete = (form) => !form.questions.find(question => (
        (question.mandatory && isEmpty(question)) ||
        (question.questions && question.questions.find(innerQuestion =>
            innerQuestion.mandatory && isEmpty(innerQuestion)))
    ));

    const showFormSaved = () => {
        setSnackbarMessage('Se guardó el cuestionario correctamente');
    }

    const showFormSent = () => {
        setSnackbarMessage('Se envió el cuestionario correctamente');
    }

    const showError = () => {
        setSnackbarMessage('Hubo un error');
    }

    const clearSnackbarMessage = () => {
        setSnackbarMessage('');
    }

    const handleSaveForm = () => {
        setLoading(true)
        FormService.saveForm(form)
            .then(() => {
                setLoading(false);
                showFormSaved();
            })
            .catch(() => {
                setLoading(false);
                showError();
            });
    }

    const handleSendForm = () => {
        setLoading(true)
        FormService.sendForm(form)
            .then(() => {
                showFormSent();
                history.push(`/misCuestionarios`);
            })
            .catch(() => {
                setLoading(false);
                showError();
            });
    }

    if(loading)
        return <LoadingBar show />;
    if(error)
        return <div>Ha ocurrido un error</div>;
    if(!form) {
        return null
    }
    return (
        <>
            <Container component="main" className={classes.container} ref={ref}>
                <Button
                    color="primary"
                    onClick={() => history.push('/misCuestionarios')}
                    style={{float: 'right'}}
                >Volver a Mis Cuestionarios</Button>
                <Typography variant="h5" align="left" className={classes.title}>{form.name}</Typography>
                <div>
                    {
                        form.questions.map((question, index) =>
                            <FormQuestion id={index} key={index} question={question} disabled={form.status === STATUS.COMPLETE} onChange={(value, groupIndex) => {
                            handleFormChange(value, index, groupIndex);
                        }} />)
                    }
                </div>
            </Container>
            {form.status !== STATUS.COMPLETE && <div className={classes.FABs}>
                <div className={classes.FABContainer}>
                    <Fab
                        color="primary"
                        aria-label="save"
                        size="medium"
                        className={classes.FAB}
                        onClick={handleSaveForm}
                    >
                        <SaveIcon/>
                    </Fab>
                </div>
                <div className={classes.FABContainer}>
                    <Fab
                        color="primary"
                        variant="extended"
                        aria-label="send"
                        className={classes.FAB}
                        disabled={!canSend}
                        onClick={handleSendForm}
                    >
                        <SendIcon/>
                        Enviar formulario
                    </Fab>
                </div>
            </div>
            }
            {form.status === STATUS.COMPLETE && <Pdf targetRef={ref} filename="code-example.pdf">
                {({ toPdf }) => <div className={classes.FABs}>
                    <div className={classes.FABContainer}>
                        <Fab
                            color="primary"
                            aria-label="save"
                            className={classes.FAB}
                            onClick={toPdf}
                        >
                            <PictureAsPdfIcon/>
                        </Fab>
                    </div>
                </div>}
            </Pdf>
            }
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={!!snackbarMessage}
                autoHideDuration={3000}
                onClose={clearSnackbarMessage}
                message={snackbarMessage}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={clearSnackbarMessage}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </>
    )
};