import React from "react";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import Dropdown from "../components/Dropdown";
import ButtonOCR from "../components/OCR/ButtonOCR";
import { Languages } from "../config/languages";
import { withRouter } from "react-router-dom";
import Language from "../@types/language";
import { ResizableBox } from "react-resizable";
import CodeRender from "../components/CodeRender";

function EditorPage() {
    const [code, setCode] = React.useState({ //rename xml to html while sending
        javascript: "",
        xml: "",
        css: "",
    });

    const srcDoc = `
    <!doctype html>

    <html lang="en">
    <head>
      <meta charset="utf-8">
    
      <title>The HTML5 Herald</title>
      <meta name="description" content="The HTML5 Herald">
      <meta name="author" content="SitePoint">
    
     <style> ${code.css} </style>
    
    </head>

    
    <body>
    ${code.xml}
      <script>
        ${code.javascript}
      </script>
    </body>
    </html>
    
    `;

    const targetRef = React.useRef<any>(null);
    const [width, setWidth] = React.useState<number>(0);

    React.useLayoutEffect(() => {
        if (targetRef.current) {
            setWidth(targetRef.current!.offsetWidth);
        }
    }, []);

    const [selected, setSelected] = React.useState<Language>(Languages[0]);
    return (
        <div className="bg-blue-50">
            <Navbar />
            <ButtonOCR />
            <Dropdown
                title="Select Langauge"
                list={Languages}
                setSelected={setSelected}
                className="py-2 px-5 w-1/5 shadow-xs"
            />
            <div className="h-full w-full m-0 flex" ref={targetRef}>
                <ResizableBox
                    className="relative flex justify-items-center m-1 shadow-xs"
                    height={500}
                    width={width / 2}
                    maxConstraints={[800, 500]}
                    minConstraints={[300, 500]}
                    axis="x"
                    handle={
                        <div
                            className="absolute right-0 h-10 w-20 bg-no-repeat shadow-md bg-center bg-gray-500 cursor-pointer"
                            style={{
                                backgroundImage: `url(/media/horizontal-resize.svg)`,
                            }}
                        />
                    }
                    handleSize={[20, 20]}
                >
                    <Editor
                        language={selected.language.toString()}
                        displayName={selected.option}
                        onChange={setCode}
                        code={code}
                    />
                </ResizableBox>
                <ResizableBox
                    className="relative px-2 flex justify-items-center m-1 shadow-xs"
                    height={500}
                    width={width / 2}
                    maxConstraints={[800, 500]}
                    minConstraints={[300, 500]}
                    axis="x"
                >
                    <CodeRender srcDoc={srcDoc} />
                </ResizableBox>
            </div>
        </div>
    );
}

export default withRouter(EditorPage);
