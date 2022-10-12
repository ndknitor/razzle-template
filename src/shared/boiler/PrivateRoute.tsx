import React, { Fragment, useContext } from 'react'
import { Navigate, PathRouteProps } from 'react-router-dom'
import { forbiddenRedirect, unauthenticatedRedirect } from '../../utils/Redirect';
import Context from '../context/Context'
interface Props extends PathRouteProps {
    roles?: string[];
    unauthenticatedRedirect?: string;
    forbiddenRedirect?: string;
}
function PrivateRoute(props: Props) {
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
        authenticated ?
            isInRole() ?
                <Fragment>
                    {props.children}
                </Fragment> :
                <Navigate to={props.forbiddenRedirect || forbiddenRedirect}/>
            :
            <Navigate to={props.unauthenticatedRedirect || unauthenticatedRedirect}/>
    )
}

export default PrivateRoute
