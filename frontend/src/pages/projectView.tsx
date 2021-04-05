import { useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";

import projectOperations from "../graphql/operations/projectOperations";
import ErrorBox from "../components/Error";
import Project from "../components/Project";

function ProjectViewPage() {
    // Get project ID from route
    const params: any = useParams();
    const projectId = params.projectId;

    const { loading, error, data } = useSubscription(
        projectOperations.subscribeProjectById,
        {
            variables: {
                id: projectId,
            },
        }
    );

    const code = data
        ? {
              //rename xml to html while sending
              javascript: data.subscribeProjectById.js,
              xml: data.subscribeProjectById.html,
              css: data.subscribeProjectById.css,
          }
        : {
              //rename xml to html while sending
              javascript: "",
              xml: "",
              css: "",
          };

    // Error handling
    const [errorBox, setErrorBox] = useState<any>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (error) {
            console.log(error);
            setErrorBox(
                <ErrorBox message={error.message} setVisible={setVisible} />
            );
            setVisible(true);
        }
    }, [error]);

    return (
        <Project
            code={code}
            isReadOnly={true}
            errorBox={errorBox}
            visible={visible}
        />
    );
}

export default withRouter(ProjectViewPage);
