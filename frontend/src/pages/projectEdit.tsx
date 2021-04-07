import { useQuery } from "@apollo/client";
import { useParams, withRouter } from "react-router";

import projectOperations from "../graphql/operations/projectOperations";
import LoadingScreen from "../components/LoadingScreen";
import ErrorBox from "../components/Error";
import Project from "../components/Project";
import { useState } from "react";

function ProjectEditPage() {
    // Get project ID from route
    const params: any = useParams();
    const projectId = params.projectId;

    // Get Project
    const { loading, error, data } = useQuery(
        projectOperations.getProjectById,
        {
            variables: {
                id: projectId,
            },
        }
    );

    // Initialize code from project
    const initState = {
              //rename xml to html while sending
              javascript: "",
              xml: "",
              css: "",
          };
    const [code, setCode] = useState(initState);

    // Error handling
    const [errorBox, setErrorBox] = useState<any>(null);
    const [visible, setVisible] = useState(false);
    if (error) {
        setErrorBox(
            <ErrorBox message={error.message} setVisible={setVisible} />
        );
        setVisible(true);
    }

    if (loading) return <LoadingScreen />;
    return (
        <Project
            code={code}
            setCode={setCode}
            errorBox={errorBox}
            visible={visible}
        />
    );
}

export default withRouter(ProjectEditPage);
