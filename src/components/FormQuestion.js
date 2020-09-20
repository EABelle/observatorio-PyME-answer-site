import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormInput from "./FormInput";
import {QUESTION_TYPE} from "../constants";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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

export default function FormQuestion({id, question, onChange, disabled}) {

    const classes = useStyles();

    const handleChange = (newValue, groupIndex) => {
        onChange(newValue, groupIndex);
    }

    return (
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
                    /> :
                    <div className={classes.multipleAnswerContainer}>
                        {
                            question.questions.map((innerQuestion, index) => (
                                <div className={classes.groupRow}>
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
                                        key={index}
                                    />
                                </div>
                            ))
                        }
                    </div>
                }
            </CardContent>
        </Card>
    )
}