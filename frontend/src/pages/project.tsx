import React from 'react';
import { useQuery } from "@apollo/client";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import CreateProjectDialog from "../components/createProjectDialog";

import Navbar from "../components/Navbar";
import projectOperations from "../graphql/operations/projectOperations";

function ProjectsPage(props: RouteComponentProps<any>) {
    function goToProjectOnList(event: any) {
        /* TODO route to actual project page */
        history.push(`/poopie/${event.target.dataset.id}`);
    }

    function goToProjectOnCreate(id: String) {
        /* TODO route to actual project page */
        props.history.push(`/poopie/${id}`);
    }

    function handleClickOpen() {
        setOpenDialog(true);
    }

    const [openDialog, setOpenDialog] = useState(false);

    const { loading, error, data, refetch } = useQuery(
        projectOperations.getUserProjects
    );

    let createProjectDialogProps = {
        openDialog,
        setOpenDialog,
        goToProjectOnCreate,
        refetch,
    };

    if (loading) return <div>Loading</div>;
    
    if (error) {
        setError(<ErrorBox message={error.message} setVisible={setVisible} />);
        setVisible(true);
    }

    return visible ? (Error) :(
        <div className="bg-blue-50">
            <Navbar />
            <Button onClick={handleClickOpen}>Create new project</Button>
            <CreateProjectDialog
                {...createProjectDialogProps}
            ></CreateProjectDialog>
            {data ? <h1>Created Projects</h1> : null}
            {data.getCurrentUser.createdProjects.map((project: any) => (
                <li
                    key={project._id}
                    data-id={project._id}
                    onClick={goToProjectOnList}
                >
                    {project.name}
                </li>
            ))}
            {data ? <h1>Shared Projects</h1> : null}
            {data.getCurrentUser.sharedProjects.map((project: any) => (
                <li
                    key={project._id}
                    data-id={project._id}
                    onClick={goToProjectOnList}
                >
                    {project.name}
                </li>
            ))}
        </div>
    );
}

export default withRouter(ProjectsPage);
