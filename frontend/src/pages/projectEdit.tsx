import { useQuery } from '@apollo/client';
import { useRef, useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import { useParams, withRouter } from 'react-router';

import Language from '../@types/language';
import CodeRender from '../components/CodeRender';
import Dropdown from '../components/Dropdown';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';
import ButtonOCR from '../components/OCR/ButtonOCR';
import { Languages } from '../config/languages';
import projectOperations from '../graphql/operations/projectOperations';
import LoadingScreen from '../components/LoadingScreen';
import ErrorBox from '../components/Error';

function ProjectEditPage() {
	const params: any = useParams();
	const projectId = params.projectId;
	const [ errorBox, setErrorBox ] = useState<any>(null);
	const [ visible, setVisible ] = useState(false);

	const { loading, error, data } = useQuery(projectOperations.getProjectById, {
		variables: {
			id: projectId
		}
	});

	const initState = data
		? {
				//rename xml to html while sending
				javascript: data.getProjectById.js,
				xml: data.getProjectById.html,
				css: data.getProjectById.css
			}
		: {
				//rename xml to html while sending
				javascript: '',
				xml: '',
				css: ''
			};
	const [ code, setCode ] = useState(initState);

	if (error) {
		setErrorBox(<ErrorBox message={error.message} setVisible={setVisible} />);
		setVisible(true);
	}

	// if (data) {
	//     setCode({
	//         javascript :data.getProjectById.js,
	//     xml : data.getProjectById.html,
	//     css : data.getProjectById.css
	//     })

	// }

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

	const [ width, setWidth ] = useState<number>(window.innerWidth);

	useEffect(() => {
		window.addEventListener('resize', () => {
			setWidth(window.innerWidth);
		});
		return () =>
			window.removeEventListener('resize', () => {
				setWidth(window.innerWidth);
			});
	});

	const [ selected, setSelected ] = useState<Language>(Languages[0]);
	if (loading) return <LoadingScreen />;
	return (
		<div className="h-full">
			<Navbar />
			{visible && errorBox}
			<ButtonOCR />
			<Dropdown
				title="Select Langauge"
				list={Languages}
				setSelected={setSelected}
				className="py-2 px-5 w-1/5 shadow-xs"
			/>
			<div className="h-full w-full flex">
					<ResizableBox
						className="relative flex justify-items-center"
						height={window.innerHeight*0.50}
						width={width / 2}
						maxConstraints={[ width *3 / 2, 800 ]}
						minConstraints={[ width/3, 800 ]}
						axis="x"
						handle={
							<div
								className="absolute right-0 h-10 w-20 bg-no-repeat shadow-md bg-center bg-gray-500 cursor-pointer"
								style={{
									backgroundImage: `url(/media/horizontal-resize.svg)`
								}}
							/>
						}
						handleSize={[ 10, 10 ]}
					>
						<div className="h-full w-full">	
						<Editor
							language={selected.language.toString()}
							displayName={selected.option}
							onChange={setCode}
							code={code}
						/>
						</div>
					</ResizableBox>

					<ResizableBox
						className="relative px-1 flex justify-items-center shadow-lg"
						height={window.innerHeight*0.50}
						width={width/2}
						maxConstraints={[ width/ 2, 800 ]}
						minConstraints={[ width/4, 800 ]}
						axis="x"
					>
						<div className="h-full w-full">
						<CodeRender srcDoc={srcDoc} />
						</div>
						
					</ResizableBox>
			</div>
		</div>
	);
}

export default withRouter(ProjectEditPage);
