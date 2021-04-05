import { useMutation } from "@apollo/client";
import { Dialog, Input } from "@material-ui/core";
import { FormEvent, useState } from "react";

import projectOperations from "../graphql/operations/projectOperations";

export default function CreateProjectDialog({
    openDialog,
    setOpenDialog,
    goToProjectOnCreate,
    refetch,
}: any) {
    const [createProject] = useMutation(projectOperations.createProject);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        // TODO: Refresh the projects page data so that the new one shows,
        // currently needs to be refreshed
        event.preventDefault();

        createProject({
            variables: {
                name: newProject.name,
            },
        })
            .then(async (response) => {
                if (response.data) {
                    console.log(response.data);
                    setOpenDialog(false);
                    setVisible(false);
                    refetch();
                    goToProjectOnCreate(response.data.createProject._id);
                }
            })
            .catch((e) => {
                console.log(e);
                setError(<h1>{e.message}</h1>);
                setVisible(true);
            });
    }

    const [newProject, setNewProject] = useState({
        name: "",
    });

    const [error, setError] = useState<any>(null);
    const [visible, setVisible] = useState(false);

    return (
        <Dialog open={openDialog}>
            {visible && error}
            Project Name:
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    onChange={(e) => {
                        setNewProject({
                            ...newProject,
                            name: e.target.value,
                        });
                    }}
                    required
                />
                <Input type="submit" />
            </form>
        </Dialog>
    );
}
