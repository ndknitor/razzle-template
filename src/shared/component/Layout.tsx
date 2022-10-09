import React, { PropsWithChildren } from 'react'
import Footer from './Footer'
import Header from './Header'

function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout