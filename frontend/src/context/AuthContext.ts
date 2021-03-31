import React from 'react';


export const AuthStateContext = React.createContext<any>(null);
export const AuthDispatchContext = React.createContext<any>(null);

export function useAuthState(){
  const context = React.useContext(AuthStateContext);
  if(context=== undefined)
    throw new Error("useAuthState must be used within an AuthProvider");
  return context;
};

export function useAuthDispatch(){
  const context = React.useContext(AuthDispatchContext);
  if(context=== undefined)
    throw new Error("useAuthState must be used within an AuthProvider");
  return context;
};





