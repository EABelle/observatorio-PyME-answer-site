import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Container, Typography} from '@material-ui/core';
import {useHistory, useParams} from "react-router-dom";
import FormService from "../services/FormService";
import LoadingBar from "../components/LoadingBar";
import FormQuestion from "../components/FormQuestion";
import Button from '@material-ui/core/Button';
import {STATUS} from "../constants";
import FormSnackbar from "../components/FormSnackbar";
import {SendFormDialog} from "../components/SendFormDialog";
import {FormFABs} from "../components/FormFABs";
import {ExportToPdfFAB} from "../components/ExportToPdfFAB";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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
        marginBottom: 12,
        fontWeight: 'bold'
    },
    description: {
        marginBottom: 16,
        textAlign: 'left',
        width: '100%',
        fontSize: 16
    },
    sectionDescription: {
        marginBottom: 16,
        textAlign: 'left',
        width: '100%',
        fontSize: 16
    },
    actionsContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    sectionTitle: {
        marginBottom: 24
    },
    cardContainer: {
        marginBottom: 32,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
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
    const history = useHistory();

    const fetch = async () => {
        setError(false);
        setLoading(true);
        try {
            const {data: formData} = await FormService.getFormById(formId);
            setForm(formData);
            setCanSend(formIsComplete(formData));
        } catch(_e) {
            setError(true);
        }
        setLoading(false);
    };

    const handleFormChange = (sectionIndex, index, groupIndex, value) => {
        if (groupIndex !== undefined) {
            form.sections[sectionIndex].questions[index].questions[groupIndex].value = value;
        } else {
            form.sections[sectionIndex].questions[index].value = value;
        }
        setForm({...form});
        setCanSend(formIsComplete(form))
    }

    const isEmpty = (question) => (
        question.value === undefined ||
        question.value === null ||
        question.value === '' ||
        (Array.isArray(question.value) && question.value.length === 0)
    );

    const sectionIsComplete = (section) => !section.questions.find(question => (
        (question.mandatory && isEmpty(question)) ||
        (question.questions && question.questions.find(innerQuestion =>
            innerQuestion.mandatory && isEmpty(innerQuestion)))
    ));

    const formIsComplete = (form) => form.sections.every(
        section => sectionIsComplete(section)
    );

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

    function getTitle(sectionIndex, section) {
        return <>{`${sectionIndex + 1}. ${section.title}`}</>;
    }

    function getQuestions() {
        return form.sections.map((section, sectionIndex) =>
            <Card className={classes.cardContainer} key={sectionIndex}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6" align="left"
                                className={classes.title}>{getTitle(sectionIndex, section)}</Typography>
                    <Typography align="left"
                                className={classes.sectionDescription}>{section.description}</Typography>
                    {
                        section.questions.map((question, index) =>
                            <FormQuestion
                                sectionIndex={sectionIndex}
                                id={index}
                                key={`${index}${question.title}`}
                                question={question}
                                disabled={form.status === STATUS.COMPLETE}
                                onChange={(value, groupIndex) =>
                                    handleFormChange(sectionIndex, index, groupIndex, value)}
                                setError={setError}
                                setLoading={setLoading}
                                setMessage={setSnackbarMessage}
                            />)
                    }
                </CardContent>
            </Card>);
    }

    function redirectToIndex() {
        history.push('/misCuestionarios');
    }

    function getFABs() {
        if(form.status !== STATUS.COMPLETE)
            return (
                <FormFABs
                    classes={classes}
                    onClickSave={handleSaveForm}
                    canSend={canSend}
                    onClickSend={handleSendForm}
                />
                )
        return <ExportToPdfFAB classes={classes} />
    }

    return (
        <>
            <div className={classes.actionsContainer}>
                <Button
                    color="primary"
                    onClick={redirectToIndex}
                ><ArrowBackIosIcon />Volver</Button>
            </div>
            <Container component="main" className={classes.container} id="exportable">
                <Typography variant="h5" align="left" className={classes.title}>{form.name}</Typography>
                <Typography align="left" className={classes.description}>{form.description}</Typography>
                <div>{getQuestions()}</div>
            </Container>
            <FormSnackbar
                onClose={clearSnackbarMessage}
                message={snackbarMessage}
            />
            <SendFormDialog
                open={confirmDialog}
                onClose={handleCloseDialog}
                onClick={handleConfirmSendForm}
            />
            {getFABs()}
        </>
    )
};