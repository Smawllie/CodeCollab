import React from 'react';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';
import Dropdown from '../components/Dropdown';
import ButtonOCR from '../components/OCR/ButtonOCR';
import { Languages } from '../config/languages';
import { withRouter } from 'react-router-dom';
import Language from '../@types/language';
import { ResizableBox } from 'react-resizable';
import CodeRender from '../components/CodeRender';

function EditorPage() {
 
	const [ code, setCode ] =   //rename xml to html while sending
    React.useState({
		javascript: '',
		xml: '',
        css:''
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

	const [ selected, setSelected ] = React.useState<Language>(Languages[0]);
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
			<div className="h-screen m-0 flex">
				<ResizableBox
					className="relative p-3 flex justify-items-center m-1 shadow-xs"
					height={500}
					width={300}
					maxConstraints={[ 800, 500 ]}
					minConstraints={[ 300, 500 ]}
					axis="x"
					handle={
						<div
							className="absolute right-3 w-10 h-7 bg-no-repeat shadow-md bg-center bg-gray-500 cursor-pointer"
							style={{ backgroundImage: `url(/media/horizontal-resize.svg)` }}
						/>
					}
					handleSize={[ 20, 20 ]}
				>
					<Editor
						language={selected.language.toString()}
						displayName={selected.option}
						onChange={setCode}
						code={code}
					/>
				</ResizableBox>
				<ResizableBox
					className="relative py-3 px-2 flex justify-items-center m-1 shadow-xs"
					height={500}
					width={300}
					maxConstraints={[ 800, 500 ]}
					minConstraints={[ 300, 500 ]}
					axis="x"
				>
                    <CodeRender srcDoc={srcDoc}/>
				</ResizableBox>
			</div>
		</div>
	);
}

export default withRouter(EditorPage);
