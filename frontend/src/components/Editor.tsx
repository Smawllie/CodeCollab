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
    visible: boolean;
}

function Editor({
    displayName,
    language,
    code,
    onChange,
    readOnly,
    setupShareDB,
    visible,
}: EditorProps) {
    let isReadOnly = readOnly ? readOnly : false;
    function handleChange(editor: any, event: any , value: string) {
        onChange(value);
    }

    function onEnter(cm: any) {
        let sels = cm.listSelections()
        for (let i = sels.length - 1; i >= 0; i--)
            cm.replaceRange(cm.doc.lineSeparator(), sels[i].anchor, sels[i].head, "+input")
    }


    return (
        <div className="bg-blue-50 w-full h-full absolute" style={visible ? {} : { display: "none" }}>
            <div className="bg-gray-700 flex justify-between py-2 px-3 text-white">
                {displayName}
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={code}
                editorDidMount={editor => setupShareDB(editor, displayName.toLowerCase())}
                options={{
                    lint: true,
                    mode: language,
                    lineWrapping: true,
                    smartIndent: false,
                    lineNumbers: true,
                    theme: "material",
                    readOnly: isReadOnly,
                    extraKeys: {
                        "Enter": onEnter
                    }
                }}
            />
        </div>
    );
}

export default Editor;
