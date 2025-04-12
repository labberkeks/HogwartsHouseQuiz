import React, {createContext, useState} from "react"; 

//UserContext
export const UserContext = createContext(); 

//UserProvider component
export function UserProvider({ children }){
    const [name, setName] = useState(""); 

    return <UserContext.Provider value={{name, setName}}>{children}</UserContext.Provider>
}