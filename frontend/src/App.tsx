
import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Route, Switch, RouteComponentProps} from 'react-router-dom';
import Routes from './config/routes';
import client from './apolloClient';
import PrivateRoute from './components/PrivateRoutes';
import {AuthProvider} from './context/index';


const App: React.FunctionComponent<{}> = () => {

return (<>
        <ApolloProvider client={client}>
         <AuthProvider>
            <BrowserRouter>
            <Switch>
                {Routes.map((route,index)=>{ 
                    
                 return (!route.protected) ? (
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
                  ): 
                  (
                       (
                          <PrivateRoute key={index} component={route.component} path={route.path}/>
                      )
                  )
            })
            }
            </Switch>
        </BrowserRouter>
        </AuthProvider>
        </ApolloProvider>

    </>);

};



export default App;
