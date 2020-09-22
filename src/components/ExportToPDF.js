import * as PropTypes from "prop-types";
import React from "react";
import Pdf from 'react-to-pdf';

export function ExportToPDF(props) {
    return <Pdf targetRef={props.targetRef} filename="code-example.pdf">
        {props.prop1}
    </Pdf>;
}

ExportToPDF.propTypes = {
    targetRef: PropTypes.any,
    prop1: PropTypes.func
};