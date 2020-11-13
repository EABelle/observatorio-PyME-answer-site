import Fab from "@material-ui/core/Fab";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import * as PropTypes from "prop-types";
import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const ONE_MILIMETER_IN_PIXELS = 0.2645833333;
const MARGIN = 16;
const A4_HEIGHT = 210;

export function ExportToPdfFAB(props) {

    const handleClick = () => {
        const input = document.getElementById('exportable');
        const inputHeightMm = input.scrollHeight * ONE_MILIMETER_IN_PIXELS + MARGIN;
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', [inputHeightMm, A4_HEIGHT]);
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("cuestionario.pdf");
            })
        ;
    };

    return (
        <div className={props.classes.FABs}>
            <div className={props.classes.FABContainer}>
                <Fab
                    color="primary"
                    aria-label="save"
                    className={props.classes.FAB}
                    onClick={handleClick}
                >
                    <PictureAsPdfIcon/>
                </Fab>
            </div>
        </div>
    );
}

ExportToPdfFAB.propTypes = {
    classes: PropTypes.any,
    onClick: PropTypes.any
};