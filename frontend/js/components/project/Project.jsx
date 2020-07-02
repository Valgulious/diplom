import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import UploadForm from "../forms/UploadForm.jsx";
import CreateProject from "../forms/CreateProject.jsx";

const Project = () => {

    const { id } = useParams();

    const [content, setContent] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/projects/' + id)
            .then(res => res.json())
            .then(res => {
                setContent(res);
                console.log(res);
            })
    }, []);

    return(
        <div>
            <div uk-grid=''>
                <div className='uk-width-1-4 uk-text-center'>
                    <div className='uk-margin-bottom'>
                        <button className="uk-button uk-button-primary" uk-toggle="target: #uploadForm">Upload</button>
                    </div>
                    <div className='uk-margin-bottom'>
                        <button className='uk-button uk-button-default' uk-toggle='target: #createProject'>Create project</button>
                    </div>
                </div>
                <div className='uk-width-expand uk-card uk-card-default uk-card-body uk-margin-right'>
                    <h3>Project</h3>
                    <div id='projects' className='uk-grid-column-small uk-grid-row-small uk-text-center' uk-grid=''>
                        {
                            content.map((cont) => (
                                <div>
                                    <span uk-icon='icon: file; ratio: 3'></span>
                                    <p>{cont.title}</p>
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