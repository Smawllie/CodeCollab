import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import "./App.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { createWorker } from "tesseract.js";

function MyDropzone({ dropHTML, setDropHTML, setFile, ...props }) {
    const onDrop = useCallback((acceptedFiles) => {
        let item;
        for (let file of acceptedFiles) {
            if (file.type.split("/")[0] === "image") {
                item = file;
                break;
            }
        }
        const blob = URL.createObjectURL(item);
        setFile(blob);
        var reader = new FileReader();
        reader.onload = function (event) {
            // setDropHTML(<img src={event.target.result}></img>);
            setDropHTML(
                <img src={event.target.result} className="max-w-full h-auto" />
            );
        };
        reader.readAsDataURL(item);
        // if(item)
        // setDropHTML(<img src=/>)
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...props} {...getRootProps()}>
            <input {...getInputProps()} />
            {dropHTML}
        </div>
    );
}

function PaperComponent(props) {
    return <Paper {...props} />;
}

export default function OCR() {
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
        handleOCRDone();
        setOcr(text);
    };

    const [ocr, setOcr] = React.useState("");
    const [file, setFile] = React.useState("");

    React.useEffect(() => {
        if (file) {
            doOCR();
        }
    }, [file]);

    // Dialog
    const [open, setOpen] = React.useState(false);
    const bold = "font-bold inline";
    const [dropHTML, setDropHTML] = React.useState(
        <p>
            <span className={bold}> Upload</span> image {"\n"}OR{"\n"}
            <span className={bold}> Paste</span> image
        </p>
    );
    const [dotClass, setDotClass] = React.useState("dot-empty");
    // const [dotClass, setDotClass] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePaste = (e) => {
        let items = e.clipboardData.items;
        let item;
        for (let i = 0; i < items.length; i++) {
            console.log(items[i]);
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
                console.log(event.target.result);
                setDropHTML(
                    <img src={event.target.result} className="dragImage" />
                );
            };
            reader.readAsDataURL(blob);
        }
    };

    const dotBase =
        "absolute left-auto right-0 top-0 bottom-auto m-1 h-1 w-1 rounded";
    const dotRed = dotBase.concat(" ", "bg-red-700");
    const dotGreen = dotBase.concat(" ", "bg-green-900");
    const dotEmpty = dotBase.concat(" ", "bg-transparent");
    const handleOCRInProgress = () => {
        setDotClass(dotRed);
    };

    const handleOCRDone = () => {
        setDotClass(dotGreen);
    };

    const handleEnter = () => {
        if (dotClass === dotGreen) setDotClass(dotEmpty);
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
            <Dialog
                open={open}
                onEnter={handleEnter}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                onPaste={handlePaste}
            >
                <div className={dotClass}></div>
                <DialogTitle id="dialog-title">Image-to-Text OCR</DialogTitle>
                <DialogContent>
                    <MyDropzone
                        className="border-dashed border-3 border-gray-400 p-1 text-center whitespace-pre-wrap"
                        dropHTML={dropHTML}
                        setDropHTML={setDropHTML}
                        setFile={setFile}
                    ></MyDropzone>

                    <DialogContentText>{ocr}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Done
                    </Button>
                    <Button onClick={handleOCRInProgress}>Orange</Button>
                    <Button onClick={handleOCRDone}>Green</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
