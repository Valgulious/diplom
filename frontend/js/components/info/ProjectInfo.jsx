import React, { useState, useEffect } from 'react'

const ProjectInfo = ({ id, mainReload }) => {

    const [project, setProject] = useState({});
    useEffect(() => {
        fetch('http://localhost:8080/api/projects/' + id)
            .then(res => res.json())
            .then(res => {
                setProject(res);
                console.log(res);
            })
    }, [id])

    let handleClickDelete = () => {
        fetch('http://localhost:8080/api/projects/' + id, {method: 'delete'})
            .then(res => {
                if (res.status === 200) {
                    mainReload()
                }
            })
    }

    return(
        <div className='uk-card uk-card-default'>
            <div className='uk-card-header'>
                <div  className='uk-flex uk-flex-around'>
                    <div>
                        <a
                            className='uk-link-text'
                            uk-icon="download"
                            href={'http://localhost:8080/api/projects/download/' + id}
                        ></a>
                    </div>
                    <div>
                        <span className='uk-link' uk-icon="trash" onClick={handleClickDelete}></span>
                    </div>
                </div>
            </div>
            <div className='uk-card-body'>
                <div uk-grid=''>
                    <div className='uk-width-1-2 uk-text-left info'>
                        <p>Create date:</p>
                    </div>
                    <div className='uk-width-1-2 uk-text-left info'>
                        <p>{project.createDate}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfo;