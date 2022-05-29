import React, { Fragment, PropsWithChildren } from 'react'
import useAuth from '../contexthook/useAuth';

function NonAuthorizeView(props:PropsWithChildren<{}>) {
    const {authenticated} = useAuth();
  return (
    authenticated ? null :
    props.children
  )
}

export default NonAuthorizeView