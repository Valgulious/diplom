import React, { useEffect, useState } from 'react'
import UploadForm from '../forms/UploadForm.jsx';
import CreateProject from '../forms/CreateProject.jsx';
import ProjectInfo from "../info/ProjectInfo.jsx";

const Main = () => {

    const [visible, setVisible] = useState(false);
    const [projectId, setProjectId] = useState('');

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/projects')
            .then(res => res.json())
            .then(res => {
                setProjects(res);
            })
    }, []);

    let handleOnClick = (e) => {
        setVisible(true);
        setProjectId(e.target.id);
        console.log(projectId);
        console.log(visible);
    }

    let handleOnDoubleClick = (e) => {
        window.location = e.target.id;
    }

    let mainReload = () => {
        setVisible(false);
        fetch('http://localhost:8080/api/projects')
            .then(res => res.json())
            .then(res => {
                setProjects(res);
            })
    }

    return(
        <div>
            <div uk-grid=''>
                <div className='uk-width-1-5 uk-text-center uk-margin-left uk-margin-right'>
                    <div className='uk-margin-bottom'>
                        <button className="uk-button uk-button-primary" uk-toggle="target: #uploadForm">
                            <span uk-icon='icon: upload'></span> Upload
                        </button>
                    </div>
                    <div className='uk-margin-bottom'>
                        <button className='uk-button uk-button-default' uk-toggle='target: #createProject'>
                            <span uk-icon='icon:  plus-circle'></span> Create project
                        </button>
                    </div>
                    {
                        visible ? <ProjectInfo id={projectId} mainReload={mainReload}/> : ''
                    }
                </div>
                <div className='uk-width-expand uk-card uk-card-default uk-card-body uk-margin-right main'>
                    <h3>Projects</h3>
                    <div id='projects' className='uk-grid-column-small uk-grid-row-small uk-text-center' uk-grid=''>
                        {
                            projects.map((project) => (
                                <div className='folder' id={project.id} onClick={handleOnClick} onDoubleClick={handleOnDoubleClick}>
                                    <div id={project.id} className='in-folder'>
                                        <img id={project.id} src="https://img.icons8.com/ios/100/000000/folder-invoices--v1.png"/>
                                        <p id={project.id}>{project.title}</p>
                                    </div>
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