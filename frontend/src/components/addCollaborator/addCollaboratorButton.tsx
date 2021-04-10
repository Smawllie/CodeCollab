import { Button } from "@material-ui/core";
import { useState } from "react";
import AddCollaboratorDialog from "./addCollaboratorDialog";

interface AddCollaboratorButtonProps {
    projectId: string;
}

export default function AddCollaboratorButton({ projectId } : AddCollaboratorButtonProps) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    let addCollaboratorDialogProps = {
        openDialog,
        setOpenDialog,
        projectId,
    };

    return (
        <div className="flex justify-center items-center">
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >Add new collaborator</Button>
            <AddCollaboratorDialog {...addCollaboratorDialogProps}></AddCollaboratorDialog>
        </div>
    );
}
