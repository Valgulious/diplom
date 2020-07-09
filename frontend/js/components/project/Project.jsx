import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import ContentInfo from '../info/ContentInfo.jsx';
import UploadForm from "../forms/UploadForm.jsx";
import CreateProject from "../forms/CreateProject.jsx";

const Project = () => {

    const { title } = useParams();

    const [project, setProject] = useState({});
    useEffect(() => {
        fetch('http://localhost:8080/api/projects/getByTitle?title=' + title)
            .then(res => res.json())
            .then(res => {
                setProject(res);
            })
    }, []);

    const [flag, setFlag] = useState(true);
    const [visible, setVisible] = useState(false);
    const [contentId, setContentId] = useState('');


    const [content, setContent] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/content/project/' + title)
            .then(res => res.json())
            .then(res => {
                setContent(res);
                console.log(res);
            })
    }, []);

    let handleOnClick = (e) => {
        setVisible(true);
        setContentId(e.target.id);
        console.log('click');
    }

    let handleOnClickDiv = () => {
        if (flag) {
            setVisible(false);
            console.log('click div');
        }
    }

    let handleOnMouseOver = () => {
        setFlag(false);
    }

    let handleOnMouseOut = () => {
        setFlag(true);
    }

    let handleClickDeleteProject = () => {
        fetch('http://localhost:8080/api/projects/' + project.id, {method: 'delete'})
    }

    let projectReload = () => {
        setVisible(false);
        fetch('http://localhost:8080/api/content/project/' + title)
            .then(res => res.json())
            .then(res => {
                setContent(res);
                console.log(res);
            })
    }

    return(
        <div>
            <div uk-grid=''>
                <div className='uk-width-1-5 uk-text-center uk-margin-left uk-margin-right'>
                    <div className='uk-margin-bottom'>
                        <button className="uk-button uk-button-primary" uk-toggle="target: #uploadForm">Upload</button>
                    </div>
                    {
                        visible ? <ContentInfo id={contentId} projectReload={projectReload}/> : ''
                    }
                </div>
                <div className='uk-width-expand uk-card uk-card-default uk-card-body uk-margin-right main'>
                    <h3>
                        <a  href='/' uk-icon="icon: arrow-left; ratio: 1.5"></a>
                        <span className='uk-margin-small-left uk-margin-small-right'>{title}</span>
                        <span className='uk-link' uk-icon="more-vertical"></span>

                    </h3>
                    <div uk-dropdown="mode: click">
                        <ul className='uk-nav uk-dropdown-nav'>
                            <li>
                                <a className='uk-link-text' href={'/api/projects/download/' + project.id}>
                                    <span uk-icon="download"></span> Download project
                                </a>
                            </li>
                            <li>
                                <a href='/' className='uk-link-text' onClick={handleClickDeleteProject}>
                                    <span uk-icon="trash"></span> Delete project
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div id='projects' className='uk-grid-column-small uk-grid-row-small uk-text-center' uk-grid=''>
                        {
                            content.map((cont) => (
                                <div className='folder' >
                                    <div id={cont.id} className='in-folder' onClick={handleOnClick}>
                                        <img id={cont.id} src="https://img.icons8.com/ios/100/000000/file.png"/>
                                        <p id={cont.id}>
                                            {
                                                cont.title.length > 10 ?
                                                    cont.title.substr(0,10) + '...' :
                                                    cont.title
                                            }
                                        </p>
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

export default Project;