import React, { useState }  from 'react';
import { useMutation } from "@apollo/client";
import { Dialog, Button,Input, Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import { TransitionProps } from '@material-ui/core/transitions';

import projectOperations from "../graphql/operations/projectOperations";

const useStyles = makeStyles({
    dialogBox:{
        padding:"3px",
    },
    content:{
        padding:"4px",
        margin:"5px",
    },
    submitBtn:{
        background: 'linear-gradient(45deg, #2193b0 30%, #6dd5ed 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 30,
        padding: '20px',
        alignSelf:"center"
    }
  });

 const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

export default function CreateProjectDialog({
    openDialog,
    setOpenDialog,
    goToProjectOnCreate,
    refetch,
    closeDialog
}: any) {
    const styles = useStyles();
    const [createProject] = useMutation(projectOperations.createProject);

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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
        <Dialog open={openDialog}
        TransitionComponent={Transition}
        onClose={closeDialog}
        className={styles.dialogBox}
        >
            {visible && error}
            <DialogTitle>
                <Typography  variant="h5" style={{color:"#1d77d1"}}>
                Project Name
                </Typography>
            </DialogTitle>
            <DialogContent className={styles.content}>
                <DialogContentText>
                    Enter a name for your new project
                </DialogContentText>
                <Input
                    type="text"
                    onChange={(e) => {
                        setNewProject({
                            ...newProject,
                            name: e.target.value,
                        });
                    }}
                    required
                    fullWidth
                    placeholder="My new Awesome Project"
                />
                <DialogActions>
                <Button
              variant="contained"
              className={styles.submitBtn}
              size="medium"
              startIcon={<AddIcon />}
              onClick={(e)=>{handleSubmit(e)}}
      >
        Add Project
      </Button>
                
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
