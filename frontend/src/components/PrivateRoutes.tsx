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
        }
      />
    );
  }

  export default PrivateRoute;