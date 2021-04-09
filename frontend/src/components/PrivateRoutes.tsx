import { useQuery } from "@apollo/client";
import { Route, Redirect, useParams } from "react-router-dom";
import React from "react";
import AuthOperations from "../graphql/operations/authOperations";
import LoadingScreen from "./LoadingScreen";
import projectOperations from "../graphql/operations/projectOperations";
import routes from "../config/routes";

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
    let comp = <Component />;

<<<<<<< HEAD
  const [authenticated,setAuthentication]= React.useState(false);
  const {data,error,loading} = useQuery(AuthOperations.checkUser);

  React.useEffect(()=>{
    if(data){
      console.log(data.getCurrentUser._id,data);
    }
    if(data && (data.getCurrentUser._id!==null || data.getCurrentUser._id!==undefined)){
      setAuthentication(true);
     }
     

  },[data]);
  
   if (loading) return (<LoadingScreen/>);
   
   if (error) {
    console.log(error);
    return (<div>{error.message}</div>);}

    let auth = data && (data.getCurrentUser._id!==null || data.getCurrentUser._id!==undefined) ;
    
   return (
      <Route
        path={path}
        {...rest}
        render={() =>
          auth ? (
              <Component/>
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
=======
    // Get Project
    const projectId = location.pathname.split("/")[2];
    const { data: dataProject, loading: loadingProject } = useQuery(
        projectOperations.getProjectById,
        {
            variables: {
                id: projectId,
            },
        }
    );

    // Authenticate user
    const { data: data, error, loading } = useQuery(AuthOperations.checkUser);
    if (loadingProject) return <LoadingScreen />;
    if (loading) return <LoadingScreen />;

    if (error) {
        console.log(error);
        return <div>{error.message}</div>;
    }
    const userId = data.getCurrentUser._id;
    let auth = !(userId === null || userId === undefined);

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
>>>>>>> cddfd2bc26a71551473a36ef64f74fd05c57ba24
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
