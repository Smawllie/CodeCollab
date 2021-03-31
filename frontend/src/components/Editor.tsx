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
            <div className="bg-gray-700 flex justify-between py-2 px-3 text-white">
            {displayName}
            <div className="w-5 h-full bg-no-repeat bg-center bg-gray-300 cursor-pointer" style={{ backgroundImage: `url(/media/arrows-angle-contract.svg)` }}>
            <button className=" w-full h-full hover:ring-4 hover:ring-green-500 hover:ring-opacity-50 hover:ring-inset"></button>
            </div>
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
