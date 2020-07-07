import React from 'react';

const CreateProject = () => {

    let handleSubmit = (e) => {
        e.preventDefault();

        let project = {};

        let project_name = document.getElementById('project_name');

        fetch('http://localhost:8080/api/projects?title=' + project_name.value, {
            method: 'post'
        });
    }

    let handleOnChange = () => {

    }

    return(
        <div id="createProject" uk-modal=''>
            <div className="uk-modal-dialog uk-modal-body">
                <form id="create" onSubmit={handleSubmit}>

                    <fieldset className='uk-fieldset'>

                        <legend className="uk-legend">Create project</legend>

                        <div className="uk-margin">
                            <input id='project_name' className="uk-input" type="text" placeholder="Project name"/>
                        </div>

                        <p className="uk-text-right">
                            <button className="uk-button uk-button-default uk-modal-close" type="button">Отмена
                            </button>
                            <input className='uk-button uk-button-primary' type="submit" value='Добавить'/>
                        </p>

                    </fieldset>

                </form>
            </div>
        </div>
    )
}

export default CreateProject;