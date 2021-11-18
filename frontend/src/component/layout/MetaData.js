import React from 'react'
import Helmet from "react-helmet";


// react helmet is used to give the title f+of the pages

function MetaData({title}) {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

export default MetaData
