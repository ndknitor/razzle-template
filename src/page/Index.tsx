import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import Head from '../head';
import './Index.css';

function Index() {
    const [count, setCount] = useState(0);
    useMemo(() =>
    {
        Head.title = 'Sample title';
        Head.metas['description'] = 'tao la dit me may';
        setCount(count + 1);
    },[]);
    return (
        <div className="Home">
            <div className="Home-header">
                <h2>{count}</h2>
            </div>
        </div>
    )
}

export default Index