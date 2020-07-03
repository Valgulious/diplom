import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import ContentInfo from '../info/ContentInfo.jsx';
import UploadForm from "../forms/UploadForm.jsx";
import CreateProject from "../forms/CreateProject.jsx";

const Project = () => {

    const { id } = useParams();

    const [visible, setVisible] = useState(false);
    const [contentId, setContentId] = useState('');

    const [content, setContent] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/projects/' + id)
            .then(res => res.json())
            .then(res => {
                setContent(res);
                console.log(res);
            })
    }, []);

    let handleOnClick = (e) => {
        setVisible(true);
        setContentId(e.target.id);
    }

    return(
        <div>
            <div uk-grid=''>
                <div className='uk-width-1-4 uk-text-center uk-margin-left uk-margin-right'>
                    <div className='uk-margin-bottom'>
                        <button className="uk-button uk-button-primary" uk-toggle="target: #uploadForm">Upload</button>
                    </div>
                    {
                        visible ? <ContentInfo id={contentId}/> : ''
                    }
                </div>
                <div className='uk-width-expand uk-card uk-card-default uk-card-body uk-margin-right'>
                    <div className='uk-inline'>
                        <h3><a href='/' uk-icon="icon: arrow-left"></a>Project</h3>
                    </div>
                    <div id='projects' className='uk-grid-column-small uk-grid-row-small uk-text-center' uk-grid=''>
                        {
                            content.map((cont) => (
                                <div onClick={handleOnClick}>
                                    <span uk-icon='icon: file; ratio: 3'></span>
                                    <p id={cont.id}>{cont.title}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>


            <UploadForm/>
            <CreateProject/>
        </div>
    );
}

export default Project;