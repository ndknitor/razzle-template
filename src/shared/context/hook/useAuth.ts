import { useContext } from "react";
import Context from "../Context";

export default function useAuth() {
    const { authenticated, roles, setAuthenticated, setRoles } = useContext(Context);
    return { authenticated, roles, setAuthenticated, setRoles };
}