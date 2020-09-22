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
import {ExportToPDF} from "../components/ExportToPDF";
import {FormFABs} from "../components/FormFABs";
import {ExportToPdfFAB} from "../components/ExportToPdfFAB";

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

export default ({ account }) => {

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
    const ref = React.createRef();

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

    function getExportToPdfFAB() {
        return ({toPdf}) => <ExportToPdfFAB classes={classes} onClick={toPdf}/>;
    }

    function getQuestions() {
        return form.sections.map((section, sectionIndex) =>
            <section key={sectionIndex}>
                <div>{section.title}</div>
                {
                    section.questions.map((question, index) =>
                        <FormQuestion
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
            </section>);
    }

    function redirectToIndex() {
        history.push('/misCuestionarios');
    }

    function getTitle() {
        return <Typography
            variant="h5"
            align="left"
            className={classes.title}
        >{form.name}
        </Typography>;
    }

    return (
        <>
            <Container component="main" className={classes.container} ref={ref}>
                <Button
                    color="primary"
                    onClick={redirectToIndex}
                    style={{float: 'right'}}
                >Volver a Mis Cuestionarios</Button>
                {getTitle()}
                <div>{getQuestions()}</div>
            </Container>
            {form.status !== STATUS.COMPLETE &&
            <FormFABs classes={classes} onClick={handleSaveForm} canSend={canSend} onClick1={handleSendForm}/>
            }
            {form.status === STATUS.COMPLETE &&
            <ExportToPDF
                targetRef={ref}
                prop1={getExportToPdfFAB()}
            />
            }
            <FormSnackbar
                onClose={clearSnackbarMessage}
                message={snackbarMessage}
            />
            <SendFormDialog open={confirmDialog} onClose={handleCloseDialog} onClick={handleConfirmSendForm}/>
        </>
    )
};