import { useQuery, useMutation } from '@apollo/client';
import projectOperations from '../graphql/operations/projectOperations';
import LoadingScreen from '../components/LoadingScreen';
import ErrorBox from '../components/Error';
import Project from '../components/Project';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { useParams, withRouter } from 'react-router';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';
import Language from '../@types/language';
import CodeRender from '../components/CodeRender';
import Dropdown from '../components/Dropdown';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';
import ButtonOCR from '../components/OCR/ButtonOCR';
import { Languages } from '../config/languages';

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

	let socket: typeof Socket | null = null;

	useEffect(() => {
		socket = io('http://localhost:4000/');

		socket.on('connect', function() {
			socket!.emit('openProject', projectId);
		});

		socket.on('disconnect', function() {
			socket!.removeAllListeners();
		});

		socket.on('hostSendData', function() {
			socket!.emit('updateProjectData', {
				html: code.xml,
				css: code.css,
				js: code.javascript
			});
		});
	}, []);

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

	const [ pushProject ] = useMutation(projectOperations.saveWebProject);
	const targetRef = useRef<any>(null);
	const [ width, setWidth ] = useState<number>(300);

	// const [selected, setSelected] = useState<Language>(Languages[0]);
	// return (
	//     <div className="bg-blue-50">
	//         <Navbar />
	//         <ButtonOCR />
	//         <Dropdown
	//             title="Select Langauge"
	//             list={Languages}
	//             setSelected={setSelected}
	//             className="py-2 px-5 w-1/5 shadow-xs"
	//         />
	//         <div className="h-full w-full m-0 flex" ref={targetRef}>
	//             <ResizableBox
	//                 className="relative flex justify-items-center m-1 shadow-xs"
	//                 height={500}
	//                 width={width / 2}
	//                 maxConstraints={[800, 500]}
	//                 minConstraints={[300, 500]}
	//                 axis="x"
	//                 handle={
	//                     <div
	//                         className="absolute right-0 h-10 w-20 bg-no-repeat shadow-md bg-center bg-gray-500 cursor-pointer"
	//                         style={{
	//                             backgroundImage: `url(/media/horizontal-resize.svg)`,
	//                         }}
	//                     />
	//                 }
	//                 handleSize={[20, 20]}
	//             >
	//                 <Editor
	//                     language={selected.language.toString()}
	//                     displayName={selected.option}
	//                     onChange={setCode}
	//                     code={code}
	//                 />
	//             </ResizableBox>
	//             <ResizableBox
	//                 className="relative px-2 flex justify-items-center m-1 shadow-xs"
	//                 height={500}
	//                 width={width / 2}
	//                 maxConstraints={[800, 500]}
	//                 minConstraints={[300, 500]}
	//                 axis="x"
	//             >
	//                 <CodeRender srcDoc={srcDoc} />
	//             </ResizableBox>
	//         </div>
	//     </div>
	// );

	useEffect(
		() => {
			const timeout = setTimeout(() => {
				let project = { html: code.xml, css: code.css, js: code.javascript, projectId };
				pushProject({ variables: project }).catch((err) => {
					console.log(err);
				});
			}, 5000);

			window.addEventListener('resize', () => {
				setWidth(window.innerWidth);
			});

			return () => {
				clearTimeout(timeout);
				window.removeEventListener('resize', () => {
					setWidth(window.innerWidth);
				});
			};
		},
		[ code ]
	);

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
					height={window.innerHeight * 0.5}
					width={width / 2}
					maxConstraints={[ width * 5 / 2, window.innerHeight * 0.5 ]}
					minConstraints={[ width / 2, window.innerHeight * 0.5 ]}
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
					height={window.innerHeight * 0.5}
					width={width / 2}
					maxConstraints={[ width / 2, window.innerHeight * 0.5 ]}
					minConstraints={[ width / 4, window.innerHeight * 0.5 ]}
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
