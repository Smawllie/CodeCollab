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

export default function DialogOCR({
    dot,
    dotClass,
    setDotClass,
    openDialog,
    setOpenDialog,
    ocr,
    setFile,
}) {
    const bold = "font-bold inline";

    // Text/image in dragndrop
    const [dropHTML, setDropHTML] = React.useState(
        <p>
            <span className={bold}> Upload</span> image of code{"\n"}OR{"\n"}
            <span className={bold}> Paste</span> image of code
        </p>
    );

    const handleClose = () => {
        setOpenDialog(false);
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
            open={openDialog}
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
