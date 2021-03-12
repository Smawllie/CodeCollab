import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import routes from './config/route';
import client from './apolloClient';


const App: React.FunctionComponent<{}> = (props) => {
	return (<div>
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
            </Switch>
        </BrowserRouter>
        </ApolloProvider>

    </div>);
};

export default App;
