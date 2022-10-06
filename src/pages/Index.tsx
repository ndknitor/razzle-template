import axios from 'axios';
import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import styles from './Index.module.css';

function Index() {
    return (
        <Fragment>
            <Helmet>
                <title>Index</title>
                <meta name='description' content='this is index page'></meta>
            </Helmet>
            <div>
                <h1 className={styles["red"]}>Index</h1>
                <NavLink to={'/about'}>About</NavLink>
            </div>
        </Fragment>
    )
}

export default Index