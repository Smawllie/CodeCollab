import React from "react";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import Dropdown from "../components/Dropdown";
import ButtonOCR from "../components/OCR/ButtonOCR";
import Language from "../@types/language";

function EditorPage(props: any) {
    const languages: Language[] = [
        {
            option: "HTML",
            language: "xml",
            selected: false,
            key: "langauge",
        },
        {
            option: "JS",
            language: "javascript",
            selected: false,
            key: "langauge",
        },
        {
            option: "CSS",
            language: "css",
            selected: false,
            key: "langauge",
        },
    ];

    const [code, setCode] = React.useState({
        javascript: "",
        css: "",
        xml: "",
    });
    const [selected, setSelected] = React.useState<Language>(languages[0]);
    return (
        <div>
            <Navbar />
            <ButtonOCR />
            <Dropdown<Language>
                title="Select Langauge"
                list={languages}
                setSelected={setSelected}
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

export default EditorPage;
