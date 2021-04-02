import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";

interface EditorProps {
    displayName: String;
    language: string;
    code: any;
    onChange: any;
    readOnly?: boolean;
}

function Editor({
    displayName,
    language,
    code,
    onChange,
    readOnly,
}: EditorProps) {
    let isReadOnly = readOnly ? readOnly : false;
    function handleChange(editor: any, data: String, value: string) {
        onChange({ ...code, [language]: value });
    }
    return (
        <div className="bg-blue-50 w-full h-full">
            <div className="bg-gray-700 flex justify-between py-2 px-3 text-white">
                {displayName}
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={code[language]}
                options={{
                    lint: true,
                    mode: language,
                    lineWrapping: true,
                    lineNumbers: true,
                    theme: "material",
                    readOnly: isReadOnly,
                }}
            />
        </div>
    );
}

export default Editor;
