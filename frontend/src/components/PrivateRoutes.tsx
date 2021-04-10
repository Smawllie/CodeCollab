import { useQuery } from "@apollo/client";
import { Route, Redirect } from "react-router-dom";
import React from "react";
import AuthOperations from "../graphql/operations/authOperations";
import LoadingScreen from "./LoadingScreen";
import { RedirectContext } from "../UserContext";

interface Props {
    component: React.FC<{}>;
    path: string;
    location: any;
}

function PrivateRoute({
    component: Component,
    path,
    location,
    ...rest
}: Props) {
    const { setHome } = React.useContext(RedirectContext);

    let comp = <Component />;

    const { data, error, loading } = useQuery(AuthOperations.checkUser);

    if (error) return <Redirect to="/" />;

    let auth =
        data &&
        (data.getCurrentUser._id !== null ||
            data.getCurrentUser._id !== undefined);
    if (auth) setHome("/projects");

    // Authenticate user
    if (loading) return <LoadingScreen />;

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
