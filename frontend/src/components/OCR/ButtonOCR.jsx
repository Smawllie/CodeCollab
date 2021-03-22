import React from "react";
import Button from "@material-ui/core/Button";
import DialogOCR from "./DialogOCR";

import { createWorker } from "tesseract.js";

const dotBase =
    "absolute left-auto right-0 top-0 bottom-auto m-1 h-1 w-1 rounded";
const dotRed = dotBase.concat(" ", "bg-red-700");
const dotGreen = dotBase.concat(" ", "bg-green-900");
const dotEmpty = dotBase.concat(" ", "bg-transparent");
let dot = {};
dot.red = dotRed;
dot.green = dotGreen;
dot.empty = dotEmpty;

export default function ButtonOCR() {
    // Class of status dot
    const [dotClass, setDotClass] = React.useState(dot.empty);
    // Text from OCR
    const [ocr, setOcr] = React.useState("Code will appear here");
    // File for upload
    const [file, setFile] = React.useState("");
    // Boolean open/close dialog box
    const [openDialog, setOpenDialog] = React.useState(false);

    const worker = createWorker({
        // logger: (m) => console.log(m),
    });

    const doOCR = async () => {
        handleOCRInProgress();
        setOcr("OCR in progress... feel free to tab out");
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");
        const {
            data: { text },
        } = await worker.recognize(file);
        handleOCRDone();
        setOcr(text);
    };

    // On file upload, run OCR
    React.useEffect(() => {
        if (file) {
            doOCR();
        }
    }, [file]);

    // Called when OCR in progress
    const handleOCRInProgress = () => {
        setDotClass(dotRed);
    };

    // Called when OCR is finished
    const handleOCRDone = () => {
        setDotClass(dotGreen);
    };

    // Called when dialog is opened
    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    let propsDialogOCR = {
        dot,
        dotClass,
        setDotClass,
        openDialog,
        setOpenDialog,
        ocr,
        setFile,
    };

    return (
        <div className="flex justify-center items-center">
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                <div className={dotClass}></div>
                Image-to-Text OCR
            </Button>
            <DialogOCR {...propsDialogOCR}></DialogOCR>
        </div>
    );
}
