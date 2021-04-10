import React from "react";
import "codemirror/lib/codemirror.css";
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/ayu-dark.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/duotone-dark.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/abcdef.css';
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

    //let isReadOnly = readOnly ? readOnly : false;
    const editorOptions = {
        lint:true,
        mode:language,
        lineWrapping:true,
        lineNumbers: true,
        theme:'material',
        foldGutter:true,
        maxHighlightLength:Infinity,
        autocorrect:true
    }
    
    function handleChange(editor: any, data: String, value: string) {
        onChange({ ...code, [language]: value });
    }
    return (
        <div className="w-full h-full" >
            <div className="bg-gray-700 flex justify-between py-2 px-3 text-white">
                {displayName}
            </div>
          <ControlledEditor
            className="h-full w-full"
            onBeforeChange={handleChange}
            value={code[language]}
            options={editorOptions}
            editorDidMount={e => {e.setSize(null, '100%')
        }}
          
          />
        </div>
    );
}

export default Editor;
