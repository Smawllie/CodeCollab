import React from 'react';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';

function EditorPage(props: any) {
	const [ html, setHtml ] = React.useState('');
	const [ css, setCss ] = React.useState('');
	const [ JS, setJS ] = React.useState('');

	return (
		<div>
			<Navbar />
			<div className="h-screen m-0 flex-col">
				<Editor language="xml" displayName="HTML" onChange={setHtml} value={html} />
				<Editor language="css" displayName="CSS" onChange={setCss} value={css} />
				<Editor language="javascript" displayName="JS" onChange={setJS} value={JS} />
			</div>
		</div>
	);
}

export default EditorPage;
