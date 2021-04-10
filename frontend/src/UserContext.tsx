import React from 'react';


export  const RedirectContext = React.createContext<any>(null);

function UserContext({children}:any) {
    const [home,setHome] = React.useState('/');
   

    return (
        <RedirectContext.Provider value={{home,setHome}}>
            {children}
        </RedirectContext.Provider>
    );
}

export default UserContext;
