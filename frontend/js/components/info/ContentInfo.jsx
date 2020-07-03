import React, { useEffect, useState } from 'react'

const ContentInfo = ({ id }) => {

    const [content, setContent] = useState({});
    useEffect(() => {
        fetch('http://localhost:8080/api/content/' + id)
            .then(res => res.json())
            .then(res => {
                setContent(res);
                console.log(res);
            })
    }, [id]);

    return(
        <div className='uk-card uk-card-default uk-card-body'>
            <div uk-grid=''>
                <div className='uk-width-1-2'>
                    <p>Project:</p>
                </div>
                <div className='uk-width-1-2'>
                    <p>Test</p>
                </div>
            </div>
        </div>
    )
}

export default ContentInfo;