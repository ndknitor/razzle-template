import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { forbiddenRedirect } from '../../utils/Redirect';
import Context from '../context/Context'

function NonAuthorize({ children }: PropsWithChildren) {
    const { authenticated, initLoading } = useContext(Context);
    return (
        !initLoading ?
            authenticated ?
                <Navigate to={forbiddenRedirect} replace />
                :
                <>{children}</>
            :
            null
    )
}

export default NonAuthorize