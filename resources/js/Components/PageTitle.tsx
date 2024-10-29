import React from 'react';

const PageTitle = ({title}: { title:string }) => {
    return (
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            {title}
        </h2>
    )
}

export default PageTitle;
