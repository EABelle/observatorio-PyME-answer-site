import React, {useEffect, useState} from "react";
import FormView from "./FormView";
import {FormFABs} from "../components/FormFABs";
import FormService from "../services/FormService";
import {useHistory, useParams} from "react-router-dom";
import {SendTemplateDialog} from "../components/SendTemplateDialog";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import UserService from "../services/UserService";
import { differenceBy } from 'lodash';
import {ConfirmSendTemplateDialog} from "../components/ConfirmSendTemplateDialog";

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

export default function TemplateView() {

    const [ form, setForm ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectUsersDialog, setSelectUsersDialog] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [ users, setUsers ] = useState([]);
    const [ polledUsers, setPolledUsers ] = useState([]);
    const history = useHistory();
    const classes = useStyles();

    const handleSendPoll = (userIds) => {
        setLoading(true)
        FormService.createPollsFromTemplate(form.id, userIds)
            .then(() => {
                handleCloseDialog();
                showFormSent();
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                handleCloseDialog();
                showError();
            });
    }
    
    
    const handleCloseDialog = () => {
        setSelectUsersDialog(false);
        setConfirmDialog(false);
    };

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
            const {data: formData} = await FormService.getTemplateById(formId);
            const {data: polledUsersResponse} = await FormService.getPolledUsers(formId);
            const {data: usersResponse} = await UserService.getUsers({ role: 'COMPANY' });
            setForm(formData);
            setUsers(differenceBy(usersResponse, polledUsersResponse, user => user.id));
            setPolledUsers(polledUsersResponse);
            console.log(differenceBy(usersResponse, polledUsersResponse, user => user.id))
        } catch(_e) {
            setError(true);
        }
        setLoading(false);
    };


    const handleSendForm = () => {
        setSelectUsersDialog(true);
    };

    const handleOpenConfirmDialog = () => {
        setSelectUsersDialog(false);
        setConfirmDialog(true);
    };

    function getFABs() {
        return (
            <FormFABs
                classes={classes}
                onClickSend={handleSendForm}
                isTemplate={true}
            />
        )
    }

    function getDialog() {
        return <SendTemplateDialog
            open={selectUsersDialog}
            onClose={handleCloseDialog}
            onSend={handleSendPoll}
            onOpenConfirm={handleOpenConfirmDialog}
            users={users}
            polledUsers={polledUsers}
            templateId={formId}
        />
    }

    function getConfirmDialog() {
        return <ConfirmSendTemplateDialog
            open={confirmDialog}
            onClose={handleCloseDialog}
            onSend={handleSendPoll}
            templateId={formId}
        />
    }

    function getActions() {
        return <Button
            color="primary"
            onClick={redirectToIndex}
        ><ArrowBackIosIcon />Volver</Button>
    }

    function redirectToIndex() {
        history.push('/plantillas');
    }

    return <FormView
        onFormChange={() => {}}
        setError={setError}
        setLoading={setLoading}
        setMessage={setSnackbarMessage}
        isTemplate={true}
        message={snackbarMessage}
        clearMessage={clearSnackbarMessage}
        renderDialog={confirmDialog ? getConfirmDialog : getDialog}
        renderFloatingActions={getFABs}
        renderActions={getActions}
        loading={loading}
        error={error}
        form={form}
    />
};