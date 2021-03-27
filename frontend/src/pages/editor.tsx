import React from "react";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import Dropdown from "../components/Dropdown";
import ButtonOCR from "../components/OCR/ButtonOCR";
import {Languages} from '../config/languages';
import {withRouter} from 'react-router-dom';
import Language from "../@types/language";


function EditorPage() {

    const [code, setCode] = React.useState({
        javascript: "",
        xml: "",
    });
    const [selected, setSelected] = React.useState<Language>(Languages[0]);
    return (
        <div className="bg-blue-50">
            <Navbar/>
            <ButtonOCR />
            <Dropdown
                title="Select Langauge"
                list={Languages}
                setSelected={setSelected}
                className="py-2 px-5 w-1/5 shadow-xs"
            />
            <div className="h-screen m-0 flex-col">
                <Editor
                    language={selected.language}
                    displayName={selected.option}
                    onChange={setCode}
                    code={code}
                />
            </div>
        </div>
    );
}

export default withRouter(EditorPage);
