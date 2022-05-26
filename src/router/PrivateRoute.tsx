import React, { Fragment, useContext } from 'react'
import { Navigate, Route, RouterProps } from 'react-router-dom'
import Context from '../context/Context'
interface Props extends RouterProps {
    roles: string[];
    unauthenticatedRedirect: string;
    forbiddenRedirect: string;
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
                null
            :
            null
    )
}

export default PrivateRoute