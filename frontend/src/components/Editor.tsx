import React from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";

import ShareDB from "sharedb/lib/client";
import { Socket } from "sharedb/lib/sharedb";
const otText = require("ot-text");
const ShareDBCodeMirror = require("sharedb-codemirror");

ShareDB.types.map["json0"].registerSubtype(otText.type);

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

    function setupShareDB(editor: any) {
        const socket = new WebSocket("ws://localhost:4000/");
        const shareConnection = new ShareDB.Connection(socket as Socket);
        const doc = shareConnection.get("test", "doc");
        ShareDBCodeMirror.attachDocToCodeMirror(doc, editor, {
            key: 'content',
            verbose: true
        });
    }

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
                    lineNumbers: true,
                    theme: "material",
                    readOnly: isReadOnly,
                }}
            />
        </div>
    );
}

export default Editor;
