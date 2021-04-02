import {useQuery} from '@apollo/client';
import {Route,Redirect} from 'react-router-dom';
import React from 'react';
import AuthOperations from '../graphql/operations/authOperations';
import LoadingScreen from './LoadingScreen';

interface Props {
  component : React.FC<{}>;
  path: string;
};


function PrivateRoute({
  component : Component,
  path:path,
  ...rest
}:Props) {

  const {data,error,loading} = useQuery(AuthOperations.checkUser);
   if (loading) return (<LoadingScreen/>);
   
   if (error) {
    console.log(error);
    return (<div>{error.message}</div>);}

   const userId = data.getCurrentUser._id;
   let auth = !(userId===null || userId === undefined ) ;

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
        }
      />
    );
  }

  export default PrivateRoute;