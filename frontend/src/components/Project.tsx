import { useLayoutEffect, useRef, useState } from "react";
import { ResizableBox } from "react-resizable";

import Language from "../@types/language";
import CodeRender from "../components/CodeRender";
import Dropdown from "../components/Dropdown";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import ButtonOCR from "../components/OCR/ButtonOCR";
import { Languages } from "../config/languages";
import { useQuery } from "@apollo/client";
import projectOperations from "../graphql/operations/projectOperations";
import LoadingScreen from "../components/LoadingScreen";
import { useParams } from "react-router-dom";

import ShareDB from "sharedb/lib/client";
import { Socket } from "sharedb/lib/sharedb";
const otText = require("ot-text");
const ShareDBCodeMirror = require("sharedb-codemirror");
ShareDB.types.map["json0"].registerSubtype(otText.type);

interface ProjectProps {
    code: any;
    setCode?: any;
    errorBox: any;
    visible: boolean;
    isReadOnly?: boolean;
}

const Project: React.FC<ProjectProps> = ({
    code,
    setCode,
    errorBox,
    visible,
    isReadOnly,
}) => {
    // Get project ID from route
    const params: any = useParams();
    const projectId = params.projectId;
    // Get Project
    const { data, loading, error } = useQuery(
        projectOperations.getProjectById,
        {
            variables: {
                id: projectId,
            },
        }
    );

    const socket = new WebSocket("ws://localhost:4000/");
    const shareConnection = new ShareDB.Connection(socket as Socket);
    const [editor, setEditor] = useState<any>(null);
    const [shareDBCM, setShareDBCM] = useState<any>(null);
    const [html, setHtml] = useState("");
    const [htmlVisible, setHtmlVisible] = useState(true);
    const [css, setCss] = useState("");
    const [cssVisible, setCssVisible] = useState(false);
    const [js, setJs] = useState("");
    const [jsVisible, setJsVisible] = useState(false);

    function setupShareDB(editor: any, lang: any) {
        let doc = shareConnection.get("files", data.getProjectById[lang]);
        setShareDBCM(ShareDBCodeMirror.attachDocToCodeMirror(doc, editor, {
            key: 'content',
            verbose: true
        }));
    }

    /* IDEA: Try using three editors lol and just hide them when not being used */
    function changeLanguage(item: any) {
        setSelected(item);
        // shareDBCM.stop();
        if (item.option === "HTML") {
            setJsVisible(false);
            setCssVisible(false);
            setHtmlVisible(true);
            // let doc = shareConnection.get("files", data.getProjectById.html);
            // setShareDBCM(ShareDBCodeMirror.attachDocToCodeMirror(doc, editor, {
            //     key: 'content',
            //     verbose: true
            // }));
        }
        else if (item.option === "CSS") {
            setHtmlVisible(false);
            setJsVisible(false);
            setCssVisible(true);
            // let doc = shareConnection.get("files", data.getProjectById.css);
            // setShareDBCM(ShareDBCodeMirror.attachDocToCodeMirror(doc, editor, {
            //     key: 'content',
            //     verbose: true
            // }));
        }
        else if (item.option === "JS") {
            setHtmlVisible(false);
            setCssVisible(false);
            setJsVisible(true);
            // let doc = shareConnection.get("files", data.getProjectById.js);
            // setShareDBCM(ShareDBCodeMirror.attachDocToCodeMirror(doc, editor, {
            //     key: 'content',
            //     verbose: true
            // }));
        }
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
                   ${css}
               </style>
           </head>

           <body>
               ${html}
               <script>
                   ${js}
               </script>
           </body>
       </html>`;

    const targetRef = useRef<any>(null);
    const [width, setWidth] = useState<number>(300);

    useLayoutEffect(() => {
        if (targetRef.current) {
            setWidth(targetRef.current!.offsetWidth);
        }
    }, [code]);

    const [selected, setSelected] = useState<Language>(Languages[0]);

    if (loading) return <LoadingScreen />;
    return (
        <div className="bg-blue-50">
            <Navbar />
            {visible && errorBox}
            <ButtonOCR />
            <div>Project: {data.getProjectById.name}</div>
            <Dropdown
                title="Select Langauge"
                list={Languages}
                setSelected={changeLanguage}
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
                    {/* <Editor
                        language={selected.language.toString()}
                        displayName={selected.option}
                        onChange={setCode}
                        code={code}
                    setupShareDB={setupShareDB}
                        readOnly={isReadOnly ? isReadOnly : false}
                    /> */}
                    <div>
                        <Editor
                            language={"xml"}
                            displayName={"HTML"}
                            onChange={setHtml}
                            code={html}
                            setupShareDB={setupShareDB}
                            readOnly={isReadOnly ? isReadOnly : false}
                        visible={htmlVisible}
                        />
                    </div>
                    <div>
                        <Editor
                            language={"css"}
                            displayName={"CSS"}
                            onChange={setCss}
                            code={css}
                            setupShareDB={setupShareDB}
                            readOnly={isReadOnly ? isReadOnly : false}
                        visible={cssVisible}
                        />
                    </div>
                    <div>
                        <Editor
                            language={"javascript"}
                            displayName={"JS"}
                            onChange={setJs}
                            code={js}
                            setupShareDB={setupShareDB}
                            readOnly={isReadOnly ? isReadOnly : false}
                        visible={jsVisible}
                        />
                    </div>

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
};

export default Project;
