import { useMutation } from "@apollo/client";
import { Dialog, DialogTitle, Input } from "@material-ui/core";
import { FormEvent, useState } from "react";
import projectOperations from "../../graphql/operations/projectOperations";

interface AddCollaboratorDialogProps {
    openDialog: boolean;
    setOpenDialog: (state: boolean) => void;
    projectId: string;
}

const AddCollaboratorDialog: React.FC<AddCollaboratorDialogProps> = ({
    openDialog,
    setOpenDialog,
    projectId,
}) => {
    const [addCollaborator] = useMutation(projectOperations.addCollaborator);

    const [collaboratorEmail, setCollaboratorEmail] = useState("");

    const [error, setError] = useState<any>(null);
    const [visible, setVisible] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(collaboratorEmail);
        console.log(projectId);

        addCollaborator({
            variables: {
                email: collaboratorEmail,
                projectId: projectId,
            },
        })
            .then((response) => {
                if (response.data) {
                    setOpenDialog(false);
                    setVisible(false);
                }
            })
            .catch((e) => {
                setError(<h1>{e.message}</h1>);
                setVisible(true);
            });
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <Dialog open={openDialog} onClose={handleClose}>
            {visible && error}
            <DialogTitle>Add new collaborator</DialogTitle>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    onChange={(e) => setCollaboratorEmail(e.target.value)}
                    required
                />
                <Input type="submit" />
            </form>
        </Dialog>
    );
};

export default AddCollaboratorDialog;
