import React, { Dispatch,SetStateAction, useState } from "react"
export class Store {
    authenticated: boolean = false;
    setAuthenticated: Dispatch<SetStateAction<boolean>> = () => { };

    roles: string[] = [];
    setRoles: Dispatch<SetStateAction<string[]>> = () => { };
}
export const useProvider : () => Store  = () =>
{
    const [authenticated, setAuthenticated] = useState(false);
    const [roles, setRoles] = useState<string[]>([]);
    return {
        authenticated,
        setAuthenticated,

        roles,
        setRoles
    };
}
const Context = React.createContext<Store>(new Store());
export default Context;