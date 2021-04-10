import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router';
import projectOperations from '../graphql/operations/projectOperations';
import LoadingScreen from '../components/LoadingScreen';
import ErrorBox from '../components/Error';
import Project from '../components/Project';

function ProjectEditPage() {
	const params: any = useParams();
	const projectId = params.projectId;
	const [ errorBox, setErrorBox ] = useState<any>(null);
	const [ visible, setVisible ] = useState(false);

	const { subscribeToMore, loading, error, data } = useQuery(projectOperations.getProjectById, {
		variables: {
			id: projectId
		}
	});

	const initState = {
		//rename xml to html while sending
		javascript: "",
		xml: "",
		css: ""
	};

	const [ code, setCode ] = useState(initState);

	if (error) {
		setErrorBox(<ErrorBox message={error.message} setVisible={setVisible} />);
		setVisible(true);
	}

	const [ pushProject ] = useMutation(projectOperations.saveWebProject);

	useEffect(
		() => {
			const push = setTimeout(() => {
				let project = { html: code.xml, css: code.css, js: code.javascript, projectId };
				pushProject({ variables: project }).catch((err) => {
					console.log(err);
				});
			}, 5000);

			return () => {
				clearTimeout(push);
			};
		},
		[ code ]
	);

	if (loading) return <LoadingScreen />;

	return (
		<Project
			code={code}
			setCode={setCode}
			errorBox={errorBox}
			visible={visible}
			isReadOnly={false}
			subscribeToNewData={() => {
				return subscribeToMore({
					document: projectOperations.subscribeProjectById,
					variables: { id: projectId },
					updateQuery: (prev, { subscriptionData }) => {
						if (!subscriptionData.data) return prev;
						const { html, css, js } = subscriptionData.data.subscribeProjectById;
						return setCode({ xml: html, css: css, javascript: js });
					}
				});
			}}
		/>
	);
}
export default withRouter(ProjectEditPage);
