import React from 'react';
import { useQuery } from "@apollo/client";
import { RouteComponentProps, withRouter,useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import queryOperations from "../graphql/operations/queryOperations";
import ErrorBox from '../components/Error';

function ProjectsPage(props: RouteComponentProps<any>) {
    let history = useHistory();
	const [Error,setError ]= React.useState<any>(null);
	const [visible,setVisible] = React.useState(false);

    function goToProject(event: any) {
        /* TODO route to actual project page */
        history.push(`/poopie/${event.target.dataset.id}`);
    }

    const userId = localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser")!)
        : "";
    console.log(userId);

    const { loading, error, data } = useQuery(queryOperations.getUserProjects, {
        variables: { id: userId },
    });

    if (loading) return <div>Loading</div>;
    
    if (error) {
        setError(<ErrorBox message={error.message} setVisible={setVisible} />);
        setVisible(true);
    }

    return visible ? (Error) :(
        <div className="bg-blue-50">
            <Navbar />
            {visible && Error}
            <h1>Test Header</h1>
            {data ? <h1>Created Projects</h1> : null}
            {data.getUserById.createdProjects.map((project: any) => (
                <li
                    key={project._id}
                    data-id={project._id}
                    onClick={goToProject}
                >
                    {project.name}
                </li>
            ))}
            {data ? <h1>Shared Projects</h1> : null}
            {data.getUserById.sharedProjects.map((project: any) => (
                <li
                    key={project._id}
                    data-id={project._id}
                    onClick={goToProject}
                >
                    {project.name}
                </li>
            ))}
        </div>
    );
}

export default withRouter(ProjectsPage);
