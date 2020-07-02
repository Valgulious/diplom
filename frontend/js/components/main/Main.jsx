import React, { useEffect, useState } from 'react'
import UploadForm from '../forms/UploadForm.jsx';
import CreateProject from '../forms/CreateProject.jsx';

const Main = () => {

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/projects')
            .then(res => res.json())
            .then(res => {
                setProjects(res);
                console.log(projects);
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
                <div className='uk-width-expand uk-card uk-card-default uk-card-body'>
                    <h1>Projects</h1>
                    <div id='projects' className='uk-grid-column-small uk-grid-row-small uk-text-center' uk-grid=''>
                        {
                            projects.map((project) => (
                                <div>
                                    <span uk-icon='folder'></span>
                                    <p>{project.title}</p>
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

export default Main;