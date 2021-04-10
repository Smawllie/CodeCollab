import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DragnDrop from "../DragnDrop";
import CopyPopup from "../CopyPopup";

const bold = "font-bold inline";

interface dotType {
    red: string;
    green: string;
    empty: string;
}

interface DialogOCRProps {
    dot: dotType;
    dotClass: string;
    setDotClass: (state: string) => void;
    openDialog: boolean;
    setOpenDialog: (state: boolean) => void;
    ocr: string;
    setFile: (state: string) => void;
}

const DialogOCR: React.FC<DialogOCRProps> = ({
    dot,
    dotClass,
    setDotClass,
    openDialog,
    setOpenDialog,
    ocr,
    setFile,
}) => {
    // Boolean open/close copy popup
    const [openCopyPopup, setOpenCopyPopup] = React.useState(false);

    // Text/image in dragndrop
    const [dropHTML, setDropHTML] = React.useState<React.ReactNode>(
        <p>
            <span className={bold}> Upload</span> image of code{"\n"}OR
            {"\n"}
            <span className={bold}> Paste</span> image of code
        </p>
    );

    // Called when dialog is closed
    const handleClose = () => {
        setOpenDialog(false);
        setOpenCopyPopup(false);
    };

    // Called when paste fires in dialog
    const handlePaste = (e: any) => {
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
                const imgSrc: string = event.target!.result as string;
                setDropHTML(
                    <img src={imgSrc} alt="ocr" className="dragImage" />
                );
            };
            reader.readAsDataURL(blob);
        }
    };

    // Called when dialog is entered
    const handleEnter = () => {
        if (dotClass === dot.green) setDotClass(dot.empty);
    };

    // Called when copy fires in dialog text box
    const handleCopy = () => {
        navigator.clipboard.writeText(ocr);
        setOpenCopyPopup(true);
    };

    // Called when copy popup is closed
    const handleCloseCopyPopup = (event: object, reason: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenCopyPopup(false);
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
                    className="border-dashed border-2 border-blue-700 border-opacity-50 rounded p-1 mb-5 text-center whitespace-pre-wrap"
                    dropHTML={dropHTML}
                    setDropHTML={setDropHTML}
                    setFile={setFile}
                ></DragnDrop>
                <DialogContentText
                    className="flex flex-row-reverse whitespace-pre-wrap border-dashed border-2 border-blue-700 border-opacity-50 rounded p-1"
                    onClick={handleCopy}
                >
                    <FileCopyIcon className="ml-1" />
                    <span className="flex-grow">{ocr}</span>
                </DialogContentText>
            </DialogContent>
            <CopyPopup
                openCopyPopup={openCopyPopup}
                handleCloseCopyPopup={handleCloseCopyPopup}
            />
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogOCR;
