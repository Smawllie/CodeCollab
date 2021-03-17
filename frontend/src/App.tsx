import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import routes from './config/route';
import client from './apolloClient';
import Page404 from './pages/404';


const App: React.FunctionComponent<{}> = () => {
	return (<>
        <ApolloProvider client={client}>
        <BrowserRouter>
            <Switch>
                {routes.map((route,index)=>{
                  return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(props:RouteComponentProps<any>)=>(
                            <route.component
                            name={route.name} 
                            {...props} 
                            {...route.props}/>
                        )}
                    />
                  );
                })}
                <Route component={Page404}/>
            </Switch>
        </BrowserRouter>
        </ApolloProvider>

    </>);
};

export default App;
