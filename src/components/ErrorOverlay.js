import * as React from 'react';
import { GridOverlay } from '@material-ui/data-grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexDirection: 'column',
            '& .ant-empty-img-1': {
                fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
            },
            '& .ant-empty-img-2': {
                fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
            },
            '& .ant-empty-img-3': {
                fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
            },
            '& .ant-empty-img-4': {
                fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
            },
            '& .ant-empty-img-5': {
                fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
                fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
            },
        },
        label: {
            marginTop: theme.spacing(1),
        },
    }),
);

export function ErrorOverlay() {
    const classes = useStyles();

    return (
        <GridOverlay>
            <div className={classes.root}>
                <div className={classes.label}>Hubo un error</div>
            </div>
        </GridOverlay>
    );
}
