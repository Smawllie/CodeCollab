import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DragnDrop({
    dropHTML,
    setDropHTML,
    setFile,
    ...props
}) {
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
            setDropHTML(
                <img src={event.target.result} className="max-w-full h-auto" />
            );
        };
        reader.readAsDataURL(item);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...props} {...getRootProps()}>
            <input {...getInputProps()} />
            {dropHTML}
        </div>
    );
}
