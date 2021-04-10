import { useQuery } from "@apollo/client";
import { Route, Redirect } from "react-router-dom";
import React from "react";
import AuthOperations from "../graphql/operations/authOperations";
import LoadingScreen from "./LoadingScreen";
import projectOperations from "../graphql/operations/projectOperations";
import {RedirectContext} from '../UserContext';


interface Props {
    component: React.FC<{}>;
    path: string;
    location: any;
}



function PrivateRoute({
    component: Component,
    path: path,
    location: location,
    ...rest
}: Props) {

    

   const {setHome} = React.useContext(RedirectContext);

    const projectId = location.pathname.split("/")[2];
    let comp = (

            <Component />

        );

    const {data,error,loading} = useQuery(AuthOperations.checkUser);
    const { data: dataProject, loading: loadingProject } = useQuery(
        projectOperations.getProjectById,
        {
            variables: {
                id: projectId,
            },
        }
    );

  
   
   if (error) return (<Redirect to='/'/>);

    let auth = data && (data.getCurrentUser._id!==null || data.getCurrentUser._id!==undefined) ;
    if(auth) setHome('/projects');
    // Get Project
    
   

    // Authenticate user
    if (loadingProject || loading) return <LoadingScreen />;

    const userId = data.getCurrentUser._id;

    // Redirect edit and view based on if user is project owner
    if (
        auth &&
        (path == "/project/:projectId/edit" ||
            path == "/project/:projectId/view")
    ) {
        const ownerId = dataProject.getProjectById.owner._id;
        // Only owners  can edit, everyone else can view
        let redirectPath;
        if (userId == ownerId) {
            redirectPath = `/project/${projectId}/edit`;
        } else {
            redirectPath = `/project/${projectId}/view`;

        }
        // If path name changed then redirect
        if (location.pathname != redirectPath)
            comp = (
                <Redirect
                    to={{
                        pathname: redirectPath,
                    }}
                />
            );
    }

    return (
        <Route
            path={path}
            {...rest}
            render={() =>
                auth ? (
                    comp
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;
