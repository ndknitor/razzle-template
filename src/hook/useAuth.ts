import { useContext } from "react";
import Context from "../context/Context";

export default function useAuth()
{
    const {authenticated, setAuthenticated, roles, setRoles} = useContext(Context);
    return {authenticated, setAuthenticated, roles, setRoles};
}