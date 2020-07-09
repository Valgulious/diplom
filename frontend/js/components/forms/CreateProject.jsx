import React, { useState } from 'react';

const CreateProject = ({ reload }) => {

    const [visible, setVisible] = useState(false);
    const [text, setText] = useState('');

    let handleSubmit = (e) => {
        e.preventDefault();

        let project = {};

        let project_name = document.getElementById('project_name');

        fetch('http://localhost:8080/api/projects?title=' + project_name.value, {
            method: 'post'
        })
            .then(res => {
                if (res.status === 200) {
                    project_name.value = '';
                    project_name.classList.remove('uk-form-success');
                    UIkit.notification({
                        message: 'Project successfully created!',
                        status: 'success',
                        pos: 'top-right',
                    });
                    reload();
                    let form = document.getElementById('createProject');
                    form.style.display = 'none';
                } else {
                    UIkit.notification({
                        message: 'Project not created.',
                        status: 'danger',
                        pos: 'top-right',
                    });
                }
            });
    }

    let handleOnChange = (e) => {

        let input = document.getElementById('project_name');
        let button = document.getElementById('create_button');

        if (e.target.value.length < 3 || e.target.value.length > 20) {
            setText('Project title must be between 3 and 20 characters long.');
            setVisible(true);
            button.disabled = true;
            input.classList.add('uk-form-danger');
            input.classList.remove('uk-form-success');
        } else {
            fetch('http://localhost:8080/api/projects/byTitle?title=' + e.target.value)
                .then(res => res.json())
                .then(res => {
                    setVisible(res);
                    if (res) {
                        button.disabled = true;
                        input.classList.add('uk-form-danger');
                        input.classList.remove('uk-form-success');
                        setText('A project with the same title already exists.');
                    } else {
                        button.disabled = false;
                        input.classList.add('uk-form-success');
                        input.classList.remove('uk-form-danger');
                    }
                })
        }


    }

    return(
        <div id="createProject" uk-modal=''>
            <div className="uk-modal-dialog uk-modal-body">
                <form id="create" onSubmit={handleSubmit}>

                    <fieldset className='uk-fieldset'>

                        <legend className="uk-legend">Create project</legend>

                        <div className="uk-margin">
                            <input id='project_name'
                                   className="uk-input"
                                   type="text"
                                   placeholder="Project name"
                                   required
                                   onChange={handleOnChange}
                            />
                            {
                                visible ?
                                    <span className='uk-text-danger'> {text}
                                    </span> : ''
                            }
                        </div>

                        <p className="uk-text-right">
                            <input id='create_button' className='uk-button uk-button-primary' type="submit" value='Create'/>
                            <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel
                            </button>
                        </p>

                    </fieldset>

                </form>
            </div>
        </div>
    )
}

export default CreateProject;