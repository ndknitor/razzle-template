import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useSSE } from 'use-sse';
import useRenderTarget from '../shared/hook/useRenderTarget';

function Render() {
    const { id } = useParams();
    const location = useLocation();
    const { isClient } = useRenderTarget();
    const [data, error] = useSSE<string>(async () => {
        if (isClient) {
            setRes(id);
        }
        return id;
    }, [id]);
    const [res, setRes] = useState(data);
    return (
        <>
            <Helmet>
                <title>About</title>
                <meta name='description' content='this is about page' />
            </Helmet>
            <>
                <h1>{res}</h1>
                <NavLink to={'/'}>Index</NavLink>
                <br/>
                <NavLink to={location.pathname + 1}>test navigation</NavLink>
            </>
        </>
    )
}

export default Render