import React from 'react'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import {Controlled as ControlledEditor} from 'react-codemirror2';



interface EditorProps{
    displayName:String;
    language:String;
    code:any;
    onChange:any
}

function Editor({displayName,language,code,onChange}:EditorProps) {
    

    function handleChange(editor:any,data:String,value:string){
            onChange({...code,language:value});
    };
    return (
        <div className="bg-gray-400" >
            <div className="bg-gray-700 flex justify-between p-2 text-white">
            {displayName}
            <button className="hover:ring-4 hover:ring-green-500 hover:ring-opacity-50 ring-inset">O/C</button>
            </div>
          <ControlledEditor
            onBeforeChange={handleChange}
            value={code.language}
            className=""
            options={{
                lint:true,
                mode:language,
                lineWrapping:true,
                lineNumbers: true,
                theme:'material'
            }}
          
          />
        </div>
    )
}

export default Editor
