import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import LoadingBar from "../components/LoadingBar";
import FormQuestion from "../components/FormQuestion";
import {STATUS} from "../constants";
import FormSnackbar from "../components/FormSnackbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PageContainer from "../components/PageContainer";

const useStyles = makeStyles(theme => ({
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
        justifyContent: 'flex-start'
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
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function FormView({
     loading,
     error,
     form,
     onFormChange,
     setError,
     setLoading,
     setMessage,
     isTemplate,
     message,
     clearMessage,
     renderDialog,
     renderActions,
     renderFloatingActions
}) {

    const classes = useStyles();

    if(loading)
        return <LoadingBar show />;
    if(error)
        return <div>Ha ocurrido un error</div>;
    if(!form) {
        return null;
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
                                disabled={isTemplate || form.status === STATUS.COMPLETE}
                                onChange={(value, groupIndex) =>
                                    onFormChange(sectionIndex, index, groupIndex, value)}
                                setError={setError}
                                setLoading={setLoading}
                                setMessage={setMessage}
                            />)
                    }
                </CardContent>
            </Card>);
    }

    return (
        <>
            <PageContainer id="exportable">
                <div className={classes.actionsContainer}>
                    {renderActions()}
                </div>
                <Typography variant="h5" align="left" className={classes.title}>{form.name}</Typography>
                <Typography align="left" className={classes.description}>{form.description}</Typography>
                <div>{getQuestions()}</div>
            </PageContainer>
            <FormSnackbar
                onClose={clearMessage}
                message={message}
            />
            {renderDialog()}
            {renderFloatingActions()}
        </>
    )
};