import { useQuery } from "@apollo/client";
import { Button,Typography } from "@material-ui/core";
import { useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import CreateProjectDialog from "../components/createProjectDialog";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import projectOperations from "../graphql/operations/projectOperations";
import ErrorBox from "../components/Error";
import DisplayList from "../components/DisplayList";
import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles({
    createBtn:{
        marginTop:"4rem",
        marginLeft:"4rem",
        padding:"10px",
        backgroundColor:"#1d77d1", 
        color:"white",
        "&:hover":{
            backgroundColor:"#2193b0",
        }

    }
});

function ProjectsPage(props: RouteComponentProps<any>) {
    const styles = useStyles();

    // function goToProjectOnList(event: any) {
    //     /* TODO route to actual project page */
    //     props.history.push(`/project/${event.target.dataset.id}/edit`);
    // }

    function goToProjectOnCreate(id: String) {
        /* TODO route to actual project page */
        props.history.push(`/project/${id}/edit`);
    }

    function handleClickOpen() {
        setOpenDialog(true);
    };

    function closeDialog(){
        setOpenDialog(false);
    }

    const [errorBox, setErrorBox] = useState<any>(null);
    const [visible, setVisible] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const { loading, error, data, refetch } = useQuery(
        projectOperations.getUserProjects
    );

    let createProjectDialogProps = {
        openDialog,
        setOpenDialog,
        goToProjectOnCreate,
        refetch,
        closeDialog
    };

    if (loading) return <LoadingScreen />;

    if (error) {
        setErrorBox(
            <ErrorBox message={error.message} setVisible={setVisible} />
        );
        setVisible(true);
    }

    return (
        <div className="bg-blue-50 h-screen w-screen p-3 overflow-auto">
            <Navbar />
            {visible && errorBox}
            <Button onClick={handleClickOpen} className={styles.createBtn} variant="contained">Create new project</Button>
            <CreateProjectDialog
                {...createProjectDialogProps}
            ></CreateProjectDialog>
            <div className="px-36 py-10">
            {data ? <Typography variant="h4" component="span" className="text-blue-500">Created Projects</Typography> : null}
            <DisplayList data={data.getCurrentUser.createdProjects}/>
            {data ? <Typography variant="h4" component="span" className="text-blue-500 pt-5" >Shared Projects</Typography> : null}
            <DisplayList data={data.getCurrentUser.sharedProjects}/>
             </div>
        </div>
    );
}

export default withRouter(ProjectsPage);
