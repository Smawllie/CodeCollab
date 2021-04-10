import { ApolloProvider } from "@apollo/client";
import React from "react";
import {
    BrowserRouter,
    Route,
    Switch,
    RouteComponentProps
} from "react-router-dom";
import Routes from './config/routes';
import client from "./apolloClient";
import PrivateRoute from "./components/PrivateRoutes";
import UserContext from './UserContext';



const App: React.FunctionComponent<{}> = () => {
    return (
        <>
            <ApolloProvider client={client}>
                <UserContext>
                <BrowserRouter>
                    <Switch>
                        {Routes.map((route, index) => {
                            return !route.protected ? (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    render={(
                                        props: RouteComponentProps<any>
                                    ) => (
                                        <route.component
                                            name={route.name}
                                            {...props}
                                            {...route.props}
                                        />
                                    )}
                                />
                            ) : (
                                <PrivateRoute
                                    key={index}
                                    component={route.component}
                                    path={route.path}
                                    {...route.props}
                                />
                            );
                        })}
                    </Switch>
                </BrowserRouter>
                </UserContext>
            </ApolloProvider>
        </>
    );
};

export default App;
