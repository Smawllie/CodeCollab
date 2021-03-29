import { useQuery } from "@apollo/client";
import { RouteComponentProps, withRouter } from "react-router-dom";

import Navbar from "../components/Navbar";
import queryOperations from "../graphql/operations/queryOperations";

function ProjectsPage(props: RouteComponentProps<any>) {
    function goToProject(event: any) {
        /* TODO route to actual project page */
        props.history.push(`/poopie/${event.target.dataset.id}`)
    }

    const userId = localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser")!)
        : "";

    console.log(userId);

    const { loading, error, data } = useQuery(queryOperations.getUserProjects, {
        variables: { id: userId },
    });

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error {error.message}</div>;

    return (
        <div className="bg-blue-50">
            <Navbar />
            <h1>Test Header</h1>
            {data ? <h1>Created Projects</h1> : null}
            {data.getUserById.createdProjects.map((project: any) => (
                <li key={project._id} data-id={project._id} onClick={goToProject}>
                    {project.name}
                </li>
            ))}
            {data ? <h1>Shared Projects</h1> : null}
            {data.getUserById.sharedProjects.map((project: any) => (
                <li key={project._id} data-id={project._id} onClick={goToProject}>
                    {project.name}
                </li>
            ))}
        </div>
    );
}

export default withRouter(ProjectsPage);
