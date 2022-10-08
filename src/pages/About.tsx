import React, { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { useSSE } from 'use-sse';
import './About.module.css';
function About() {
  const [data, error] = useSSE<string>(async () => {
    return "<script>alert('co cai con cac')</script>";
  }, []);
  const [res, setRes] = useState(data);
  return (
    <Fragment>
      <Helmet>
        <title>About</title>
        <meta name='description' content='this is about page' />
      </Helmet>
      <div>
        <h1>{res}</h1>
        <NavLink to={'/'}>Index</NavLink>
      </div>
    </Fragment>
  )
}

export default About