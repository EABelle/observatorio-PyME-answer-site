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
import Button from '@material-ui/core/Button';
import Pdf from 'react-to-pdf';
import {STATUS} from "../constants";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import FormSnackbar from "../components/FormSnackbar";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PymeClient from "../api/PymeClient";

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
        fetch();
    }, []);

    const [ form, setForm ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [canSend, setCanSend] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [pyme, setPyme] = useState(null);
    const history = useHistory();
    const ref = React.createRef();

    const fetch = async () => {
        setError(false);
        setLoading(true);
        try {
            const {data: formData} = await FormService.getFormById(formId);
            setForm(formData);
            setCanSend(isComplete(formData));
            const {data: pymeDetails} = await PymeClient.getPymeDetailsById(formData.pymeUserId);
            setPyme(pymeDetails);
        } catch(_e) {
            setError(true);
        }
        setLoading(false);
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
        question.value === '' ||
        (Array.isArray(question.value) && question.value.length === 0)
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

    const handleConfirmSendForm = () => {
        setLoading(true)
        FormService.sendForm(form)
            .then(() => {
                handleCloseDialog();
                showFormSent();
                history.push(`/misCuestionarios`);
            })
            .catch(() => {
                setLoading(false);
                handleCloseDialog();
                showError();
            });
    }

    const handleSendForm = () => {
        setConfirmDialog(true);
    };

    const handleCloseDialog = () => {
        setConfirmDialog(false);
    };

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
                <Typography
                    variant="h5"
                    align="left"
                    className={classes.title}
                >{form.name}
                </Typography>
                { JSON.stringify(pyme) }
                <div>
                    {
                        form.questions.map((question, index) =>
                            <FormQuestion
                                id={index}
                                key={index}
                                question={question}
                                disabled={form.status === STATUS.COMPLETE}
                                onChange={(value, groupIndex) =>
                                    handleFormChange(value, index, groupIndex)}
                                setError={setError}
                                setLoading={setLoading}
                                setMessage={setSnackbarMessage}
                            />)
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
            <FormSnackbar
                onClose={clearSnackbarMessage}
                message={snackbarMessage}
            />
            <Dialog
                open={confirmDialog}
                keepMounted
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">¿Confirma el envío el formulario?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Esta opción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmSendForm} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};