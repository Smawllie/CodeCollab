import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DragnDrop from "../DragnDrop";

import { createWorker } from "tesseract.js";

function DialogOCR({
    dot,
    dotClass,
    setDotClass,
    open,
    setOpen,
    ocr,
    setFile,
}) {
    // Dialog

    const bold = "font-bold inline";
    const [dropHTML, setDropHTML] = React.useState(
        <p>
            <span className={bold}> Upload</span> image of code{"\n"}OR{"\n"}
            <span className={bold}> Paste</span> image of code
        </p>
    );

    const handleClose = () => {
        setOpen(false);
        setOpenCopy(false);
    };

    const handlePaste = (e) => {
        let items = e.clipboardData.items;
        let item;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.split("/")[0] === "image") {
                item = items[i];
                break;
            }
        }
        if (item) {
            let blob = item.getAsFile();
            setFile(blob);
            var reader = new FileReader();
            reader.onload = function (event) {
                // setDropHTML(<img src={event.target.result}></img>);
                setDropHTML(
                    <img src={event.target.result} className="dragImage" />
                );
            };
            reader.readAsDataURL(blob);
        }
    };

    const handleEnter = (target) => {
        if (dotClass === dot.green) setDotClass(dot.empty);
    };

    // snackbar
    const [openCopy, setOpenCopy] = React.useState(false);

    const handleCopy = (e) => {
        navigator.clipboard.writeText(ocr);
        setOpenCopy(true);
    };

    const handleCloseCopy = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenCopy(false);
    };

    return (
        <Dialog
            open={open}
            onEnter={handleEnter}
            onClose={handleClose}
            onPaste={handlePaste}
        >
            <div className={dotClass}></div>
            <DialogTitle id="dialog-title">Image-to-Text OCR</DialogTitle>
            <DialogContent>
                <DragnDrop
                    className="border-dashed border-3 border-gray-400 p-1 mb-5 text-center whitespace-pre-wrap"
                    dropHTML={dropHTML}
                    setDropHTML={setDropHTML}
                    setFile={setFile}
                ></DragnDrop>
                <DialogContentText
                    className="flex flex-row-reverse whitespace-pre-wrap border-dashed border-3 border-gray-400 p-1"
                    onClick={handleCopy}
                >
                    <FileCopyIcon className="" />
                    <span className="flex-grow">{ocr}</span>
                </DialogContentText>
            </DialogContent>
            <Snackbar
                className="text-center"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                open={openCopy}
                autoHideDuration={1500}
                onClose={handleCloseCopy}
                message="Copied!"
            />
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const dotBase =
    "absolute left-auto right-0 top-0 bottom-auto m-1 h-1 w-1 rounded";
const dotRed = dotBase.concat(" ", "bg-red-700");
const dotGreen = dotBase.concat(" ", "bg-green-900");
const dotEmpty = dotBase.concat(" ", "bg-transparent");
let dot = {};
dot.red = dotRed;
dot.green = dotGreen;
dot.empty = dotEmpty;

// put types above component, only for func parameters
// create another folder to put in components
export default function ButtonOCR() {
    // OCR
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
        // pass done and progress handlers in. encapsulate
        handleOCRDone();
        setOcr(text);
    };

    const [dotClass, setDotClass] = React.useState(dot.empty);
    const [ocr, setOcr] = React.useState("Code will appear here");
    const [file, setFile] = React.useState("");

    React.useEffect(() => {
        if (file) {
            doOCR();
        }
    }, [file]);

    const handleOCRInProgress = () => {
        setDotClass(dotRed);
    };

    const handleOCRDone = () => {
        setDotClass(dotGreen);
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Snackbar or alert
    // put snackbar in app level and create a hook for useSnackbar, that returns func that takes in a string
    // child to parent: use handler
    // sibling to sibling: goes through parent
    // parent to child: use anything

    // react context: how to pass state through entire tree. can pass state here and all children would have it
    // use it for the app state, redux. may be helpful for current logged in user. the react-way is to use it context.
    // app state is the state at application level

    let propsDialogOCR = {
        dot,
        dotClass,
        setDotClass,
        open,
        setOpen,
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
