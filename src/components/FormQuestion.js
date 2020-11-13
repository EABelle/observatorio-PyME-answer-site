import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormInput from './FormInput';
import {QUESTION_TYPE} from "../constants";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import FormService from "../services/FormService";
import HelpIcon from '@material-ui/icons/Help';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
    container: {
        marginBottom: 16
    },
    questionContainer: {
        marginBottom: 16,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    formInputDescription: {
        marginBottom: 16,
        textAlign: 'left',
        width: '100%',
        fontStyle: 'italic',
        fontSize: 14
    },
    formInputTitle: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 4
    },
    formInputSubtitle: {
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

export default function FormQuestion({id, question, onChange, disabled, setLoading, setMessage, setError, sectionIndex}) {

    const classes = useStyles();

    const [confirmDialog, setConfirmDialog] = useState(false);

    const handleChange = (newValue, groupIndex) => {
        console.log(newValue);
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

    function getQuestionTitle() {
        return `${question.mandatory ? '*' : ''}${sectionIndex + 1}.${id + 1}. ${question.title}`;
    }

    function getInnerQuestionTitle(innerQuestion, index) {
        return `${innerQuestion.mandatory ? '*' : ''}${sectionIndex + 1}.${id + 1}.${index + 1}. ${innerQuestion.title}`;
    }

    return (
        <div className={classes.container}>
            <div className={classes.formInputTitle}>{getQuestionTitle()}</div>
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
                    multiline={question.multiline}
                    disclaimer={question.disclaimer}
                /> :
                <div className={classes.multipleAnswerContainer}>
                    {
                        question.questions.map((innerQuestion, index) => (
                            <div className={classes.groupRow} key={index}>
                                {!!innerQuestion.title && <div
                                    className={classes.formInputSubtitle}>{getInnerQuestionTitle(innerQuestion, index)}</div>}
                                {!!innerQuestion.description &&
                                <div className={classes.formInputDescription}>{innerQuestion.description}</div>}
                                <FormInput
                                    className={classes.formInput}
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
                                    multiline={question.multiline}
                                    disclaimer={question.disclaimer}
                                    key={index}
                                />
                            </div>
                        ))
                    }
                </div>
            }
            <div className={classes.questionContainer}>
                {!disabled &&
                <HelpIcon fontSize="small" onClick={handleSendForm}/>
                }
            </div>
            <Divider variant="middle"/>
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
                        Al aceptar este diálogo, un representante va a contactarse con vos telefónicamente dentro de las
                        siguientes 24hs.
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
        </div>
    )
}