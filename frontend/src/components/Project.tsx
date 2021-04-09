import { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";

import Language from "../@types/language";
import CodeRender from "../components/CodeRender";
import Dropdown from "../components/Dropdown";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import ButtonOCR from "../components/OCR/ButtonOCR";
import { Languages } from "../config/languages";

interface ProjectProps {
    code: any;
    setCode?: any;
    errorBox: any;
    visible: boolean;
    isReadOnly?: boolean;
    subscribeToNewData?:Function;
}

const Project: React.FC<ProjectProps> = ({
    code,
    setCode,
    errorBox,
    visible,
    isReadOnly,
    subscribeToNewData
}) => {
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

    const [width, setWidth] = useState<number>(window.innerWidth);


    const [selected, setSelected] = useState<Language>(Languages[0]);

    useEffect(()=>{

        if(subscribeToNewData!==undefined) subscribeToNewData();

		window.addEventListener('resize', () => {
			setWidth(window.innerWidth);
		});
        return ()=>{
            window.removeEventListener('resize',()=>{
                setWidth(window.innerWidth);
            });
        };
        
    },[code]);


    return (
        <div className="bg-blue-100 h-full w-full overflow-auto">
            <Navbar />
            {visible && errorBox}
            <ButtonOCR />
            <Dropdown
                title="Select Langauge"
                list={Languages}
                setSelected={setSelected}
                className="py-2 px-5 w-1/5 shadow-xs"
            />
            <div className="h-full w-full m-0 flex">
                <ResizableBox
                    className="relative flex justify-items-center m-1 shadow-xs"
                    height={window.innerHeight*1}
                    width={width / 2}
                    maxConstraints={[width *5 / 2, window.innerHeight*0.75]}
                    minConstraints={[width / 2, window.innerHeight*0.75]}
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
                        readOnly={isReadOnly ? isReadOnly : false}
                    />
                </ResizableBox>
                <ResizableBox
                    className="relative px-2 flex justify-items-center m-1 shadow-xs"
                    height={window.innerHeight*1}
                    width={width / 2}
                    maxConstraints={[width *5 / 2,  window.innerHeight*0.75]}
                    minConstraints={[width/ 2,  window.innerHeight*0.75]}
                    axis="x"
                >
                    <CodeRender srcDoc={srcDoc} />
                </ResizableBox>
            </div>
        </div>
    );
};

export default Project;
