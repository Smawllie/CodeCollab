import { useQuery } from "@apollo/client";
import { useLayoutEffect, useRef, useState } from "react";
import { ResizableBox } from "react-resizable";
import { useParams, withRouter } from "react-router";

import Language from "../@types/language";
import CodeRender from "../components/CodeRender";
import Dropdown from "../components/Dropdown";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import ButtonOCR from "../components/OCR/ButtonOCR";
import { Languages } from "../config/languages";
import projectOperations from "../graphql/operations/projectOperations";
import LoadingScreen from "../components/LoadingScreen";
import ErrorBox from "../components/Error";

function ProjectEditPage() {
    const [code, setCode] = useState({
        //rename xml to html while sending
        javascript: "",
        xml: "",
        css: "",
    });

    const params: any = useParams();
    const projectId = params.projectId;
    const [errorBox, setErrorBox] = useState<any>(null);
    const [visible, setVisible] = useState(false);

    const { loading, error, data } = useQuery(
        projectOperations.getProjectById,
        {
            variables: {
                id: projectId,
            },
        }
    );

    if (loading) console.log("loading...");

    if (error) {
        setErrorBox(
            <ErrorBox message={error.message} setVisible={setVisible} />
        );
        setVisible(true);
    }

    if (data) {
        code.javascript = data.getProjectById.js;
        code.xml = data.getProjectById.html;
        code.css = data.getProjectById.css;
    }

    const srcDoc = `
       <!DOCTYPE html>
       <html lang="en">
           <head>
               <meta charset="utf-8" />
               <title>The HTML5 Herald</title>
               <meta name="description" content="The HTML5 Herald" />
               <meta name="author" content="SitePoint" />
               <style>
                   ${code.css}
               </style>
           </head>

           <body>
               ${code.xml}
               <script>
                   ${code.javascript}
               </script>
           </body>
       </html>`;

    const targetRef = useRef<any>(null);
    const [width, setWidth] = useState<number>(0);

    useLayoutEffect(() => {
        if (targetRef.current) {
            setWidth(targetRef.current!.offsetWidth);
        }
    }, []);

    const [selected, setSelected] = useState<Language>(Languages[0]);
    return (
        <div className="bg-blue-50">
            <Navbar />
            {visible && errorBox}
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

export default withRouter(ProjectEditPage);
