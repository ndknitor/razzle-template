import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { Navigate, PathRouteProps, Route, useNavigate } from 'react-router-dom';
import { forbiddenRedirect, unauthenticatedRedirect } from '../../utils/Redirect';
import Context from '../context/Context';
interface Props extends PropsWithChildren {
    roles?: string[];
    unauthenticatedRedirect?: string;
    forbiddenRedirect?: string;
}
function Authorize(props: Props) {
    const navigate = useNavigate();
    const { authenticated, roles, initLoading } = useContext(Context);
    const isInRole = () => {
        if (!props.roles) {
            return true;
        }
        for (let i = 0; i < roles.length; i++) {
            const element = roles[i];
            if (props.roles.includes(element)) {
                return true;
            }
        }
        return false;
    }
    useEffect(() => {
        if (initLoading) {
            return;
        }
        if (!authenticated) {
            navigate(props.unauthenticatedRedirect || unauthenticatedRedirect);
        }
        if (!isInRole()) {
            navigate(props.forbiddenRedirect || forbiddenRedirect);
        }
    }, [initLoading])
    return (
        !initLoading ?
            authenticated ?
                isInRole() ?
                    <>{props.children}</>
                    :
                    null
                :
                null
            :
            null
    )
}

export default Authorize