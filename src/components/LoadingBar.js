import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from "@material-ui/core/LinearProgress";

export default function LoadingBar({ show }) {
    return show && <LinearProgress />;
}

LoadingBar.propTypes = {
    show: PropTypes.bool
};