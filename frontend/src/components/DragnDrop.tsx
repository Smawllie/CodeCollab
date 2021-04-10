import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DragnDropProps {
    dropHTML: React.ReactNode;
    setDropHTML: (state: React.ReactNode) => void;
    setFile: (state: string) => void;
    className: string;
}

const DragnDrop: React.FC<DragnDropProps> = ({
    dropHTML,
    setDropHTML,
    setFile,
    ...props
}) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
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
                const imgSrc: string = event.target!.result as string;
                setDropHTML(
                    <img src={imgSrc} alt="ocr" className="max-w-full h-auto" />
                );
            };
            reader.readAsDataURL(item);
        },
        [setDropHTML, setFile]
    );
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...props} {...getRootProps()}>
            <input {...getInputProps()} />
            {dropHTML}
        </div>
    );
};

export default DragnDrop;
