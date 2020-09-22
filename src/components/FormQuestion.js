import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormInput from "./FormInput";
import {QUESTION_TYPE} from "../constants";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import FormService from "../services/FormService";
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles(() => ({
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
    formInput: {
        maxWidth: 480
    },
    formInputTitle: {
        textAlign: 'left',
        fontWeight: 'bold',
    },
    formInputSubtitle: {
        textAlign: 'left',
    },
    formInputDescription: {
        textAlign: 'left',

    },
    groupRow: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'left',
        flexDirection: 'column',
        maxWidth: 480,
        padding: 32
    },
    multipleAnswerContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    }
}));

export default function FormQuestion({id, question, onChange, disabled, setLoading, setMessage, setError}) {

    const classes = useStyles();

    const [confirmDialog, setConfirmDialog] = useState(false);

    const handleChange = (newValue, groupIndex) => {
        onChange(newValue, groupIndex);
    }

    const handleSendForm = () => {
        setConfirmDialog(true);
    };

    const handleCloseDialog = () => {
        setConfirmDialog(false);
    };

    const handleConfirmSendForm = () => {
        setLoading(true)
        FormService.askForHelp(question.id)
            .then(() => {
                handleCloseDialog();
                setMessage('Solicitaste asesoramiento telfónico');
            })
            .catch(() => {
                setLoading(false);
                handleCloseDialog();
                setError();
            });
    }

    return (
        <>
            <Card className={classes.cardContainer}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.formInputTitle}>{question.mandatory && '*'}{question.title}</div>
                    {!!question.description && <div className={classes.formInputDescription}>{question.description}</div>}
                    {question.type !== QUESTION_TYPE.GROUPED ?
                        <FormInput
                            className={classes.formInput}
                            onChange={handleChange}
                            id={`${id}`}
                            name={question.title}
                            required={question.mandatory}
                            value={question.value}
                            type={question.type}
                            options={question.options}
                            restrictions={question.restrictions}
                            disabled={disabled}
                            adornment={question.adornment}
                            isCurrency={question.isCurrency}
                            inputProps={question.inputProps}
                        /> :
                        <div className={classes.multipleAnswerContainer}>
                            {
                                question.questions.map((innerQuestion, index) => (
                                    <div className={classes.groupRow} key={index}>
                                        {!!innerQuestion.title && <div className={classes.formInputSubtitle}>{innerQuestion.title}</div>}
                                        {!!innerQuestion.description && <div className={classes.formInputDescription}>{innerQuestion.description}</div>}
                                        <FormInput
                                            onChange={(innerValue) => handleChange(innerValue, index)}
                                            id={`${id}${index}`}
                                            name={innerQuestion.title}
                                            required={innerQuestion.mandatory}
                                            value={innerQuestion.value}
                                            type={innerQuestion.type}
                                            options={innerQuestion.options}
                                            restrictions={innerQuestion.restrictions}
                                            disabled={disabled}
                                            adornment={question.adornment}
                                            isCurrency={question.isCurrency}
                                            inputProps={question.inputProps}
                                            key={index}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    }
                    <div>{ question.disclaimer && <div>{question.disclaimer}</div> }</div>
                </CardContent>
                <div style={{padding: 16}}>
                    {!disabled &&
                    <HelpIcon fontSize="small" style={{float: 'right', bottom: 4, right: 4}} onClick={handleSendForm} />
                    }
                </div>
            </Card>
            <Dialog
                open={confirmDialog}
                keepMounted
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">¿Necesitás ayuda?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Al aceptar este diálogo, un representante va a contactarse con vos telefónicamente dentro de las siguientes 24hs.
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
}