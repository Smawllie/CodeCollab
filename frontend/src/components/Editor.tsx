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
    setupShareDB: any;
}

function Editor({
    displayName,
    language,
    code,
    onChange,
    readOnly,
    setupShareDB,
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
            editorDidMount={editor => setupShareDB(editor) }
                options={{
                    lint: true,
                    mode: language,
                    lineWrapping: true,
                    smartIndent: false,
                    lineNumbers: true,
                    theme: "material",
                    readOnly: isReadOnly,
                }}
            />
        </div>
    );
}

export default Editor;
