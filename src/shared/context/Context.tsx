import { createContext ,Dispatch, SetStateAction, useState } from "react"
export class Store {
    initLoading : boolean;
    setInitLoading : Dispatch<SetStateAction<boolean>> = () => { };

    authenticated: boolean = false;
    setAuthenticated: Dispatch<SetStateAction<boolean>> = () => { };

    roles: string[] = [];
    setRoles: Dispatch<SetStateAction<string[]>> = () => { };
}
export const useProvider: () => Store = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [roles, setRoles] = useState<string[]>([]);
    return {
        initLoading,
        setInitLoading,

        authenticated,
        setAuthenticated,

        roles,
        setRoles
    };
}
const Context = createContext<Store>(new Store());
export default Context;