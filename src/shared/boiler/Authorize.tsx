import React, { PropsWithChildren, useContext } from 'react'
import { Navigate, PathRouteProps, Route } from 'react-router-dom';
import { forbiddenRedirect, unauthenticatedRedirect } from '../../utils/Redirect';
import Context from '../context/Context';
interface Props extends PropsWithChildren {
    roles?: string[];
    unauthenticatedRedirect?: string;
    forbiddenRedirect?: string;
}
function Authorize(props: Props) {
    const { initLoading } = useContext(Context);
    const { authenticated, roles } = useContext(Context);
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
    return (
        !initLoading ?
            authenticated ?
                isInRole() ?
                    <>{props.children}</>
                    :
                    <Navigate to={props.forbiddenRedirect || forbiddenRedirect} replace />
                :
                <Navigate to={props.unauthenticatedRedirect || unauthenticatedRedirect} replace />
            :
            null
    )
}

export default Authorize