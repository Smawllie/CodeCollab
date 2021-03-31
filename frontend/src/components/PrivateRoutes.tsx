import {Route,Redirect} from 'react-router-dom';
import React from 'react';
import {useAuthState} from '../context/index';

interface Props {
  component : React.FC<{logout:Function}>;
  path: string;
};



function PrivateRoute({
  component : Component,
  path:path,
  ...rest
}:Props) {
   
    const userDetails = useAuthState();
    const auth = userDetails!==undefined && userDetails.id !== "" ; //use context
    return (
      <Route
        path={path}
        {...rest}
        render={() =>
          auth ? (
              <Component logout={()=>{}}/>
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