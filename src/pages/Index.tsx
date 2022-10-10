import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { useSSE } from 'use-sse';
import useRenderTarget from '../shared/hook/useRenderTarget';
import styles from './Index.module.css';
function Index() {
    const { isClient } = useRenderTarget();
    const [data, error] = useSSE<string>(async () => {
        const r = "<script>alert('dit me may')</script>";
        if (isClient) {
            setRes(r);
        }
        return r;
    }, []);
    const [res, setRes] = useState(data);
    return (
        <>
            <Helmet>
                <title>This is title</title>
                <meta name='description' content='this is index page'></meta>
            </Helmet>
            <>
                <h1 className={styles["red"]}>Index</h1>
                <NavLink to={'/about'}>About</NavLink>
                <br />
                <NavLink to={"/render/1"}>Render</NavLink>
                <h1>{res}</h1>
            </>
        </>
    )
}

export default Index