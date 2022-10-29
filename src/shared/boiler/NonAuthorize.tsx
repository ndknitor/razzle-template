import React, { PropsWithChildren, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { forbiddenRedirect } from '../../utils/Redirect';
import Context from '../context/Context'

function NonAuthorize({ children }: PropsWithChildren) {
    const { authenticated } = useContext(Context);
    return (
        authenticated ?
        <Navigate to={forbiddenRedirect} replace/>
        :
        <>{children}</>
    )
}

export default NonAuthorize