import React from 'react';
import {AuthStateContext,AuthDispatchContext} from './AuthContext';
import {AuthReducer,initialState} from './reducer';

const AuthProvider = ({children}:any) =>{

    const [user,dispatch] = React.useReducer(AuthReducer, initialState);
  
    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
    
  }

  export default AuthProvider;