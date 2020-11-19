import React, {useEffect, useState} from "react";
import FormView from "./FormView";
import {STATUS} from "../constants";
import {FormFABs} from "../components/FormFABs";
import {ExportToPdfFAB} from "../components/ExportToPdfFAB";
import FormService from "../services/FormService";
import {useHistory, useParams} from "react-router-dom";
import {SendFormDialog} from "../components/SendFormDialog";
import {makeStyles} from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
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
    }
}));

export default function PollView() {

    const [ form, setForm ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [canSend, setCanSend] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const history = useHistory();
    const classes = useStyles();

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
    const handleCloseDialog = () => {
        setConfirmDialog(false);
    };
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

    let { id: formId } = useParams();
    useEffect(() => {
        fetch();
    }, []);

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
        setConfirmDialog(true);
    };

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

    function getDialog() {
        return <SendFormDialog
            open={confirmDialog}
            onClose={handleCloseDialog}
            onClick={handleConfirmSendForm}
        />
    }

    function getActions() {
        return <Button
            color="primary"
            onClick={redirectToIndex}
        ><ArrowBackIosIcon />Volver</Button>
    }

    function redirectToIndex() {
        history.push('/misCuestionarios');
    }

    return <FormView
        onFormChange={handleFormChange}
        setError={setError}
        setLoading={setLoading}
        setMessage={setSnackbarMessage}
        message={snackbarMessage}
        clearMessage={clearSnackbarMessage}
        renderDialog={getDialog}
        renderActions={getActions}
        renderFloatingActions={getFABs}
        loading={loading}
        error={error}
        form={form}
    />
};