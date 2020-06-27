import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Hidden from "./Hidden.jsx";

const defaultForm = {
    projects: [
        {title: 'Project 1'},
        {title: 'Project 2'}
    ],
    phases: [
        {title: 'Testing'},
        {title: 'Calibration'}
    ],
    settings: [
        {title: 'Default'},
        {title: 'Factory'}
    ],
    contentTypes: [
        {type: 'Type 1'},
        {type: 'Type 2'}
    ],
    resourceTypes: [
        {resource: 'Resource 1'},
        {resource: 'Resource 2'}
    ]
}

const Main = () => {

    const [hidden, setHidden] = useState(true);

    const [form, setForm] = useState(defaultForm);
    useEffect(() => {
        fetch('http://localhost:8080/api/form')
            .then(res => res.json())
            .then(res => {
                setForm(res)
            })

    }, []);

    let handleSubmit = (e) => {
        e.preventDefault();

        console.log('test');

        let formData = new FormData();

        let project = document.getElementById('project');
        let test = document.getElementById('test');
        let phase = document.getElementsByName('phase');

        phase.forEach(element => {
            if (element.checked) console.log(element.value);
        })

        console.log(project.value);
        console.log(phase);
    }

    return (
        <div className='uk-position-center'>
            <div className='uk-margin-bottom'>
                <button className="uk-button uk-button-primary uk-button-large" uk-toggle="target: #form">Добавить</button>
            </div>
            <div id="form" uk-modal="">
                <div className="uk-modal-dialog uk-modal-body">
                    <form id="upload" onSubmit={handleSubmit}>

                        <fieldset className='uk-fieldset'>

                            <legend className="uk-legend">Добавление контента</legend>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Project</label>
                                <select id='project' className="uk-select">
                                    <option>Not chosen</option>
                                    {
                                        form.projects.map((project) => (
                                            <option value={project.title}>{project.title}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Phase</label>
                                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    {
                                        form.phases.map((phase) => (
                                            <label>
                                                <input className="uk-radio" type="radio" name="phase" value={phase.title}/>
                                                {phase.title}
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Settings</label>
                                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    {
                                        form.settings.map((set) => (
                                            <label><input className="uk-radio" type="radio" name="settings"/>{set.title}</label>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Sensor ID</label>
                                <input id="sensor" className="uk-input" type="number" placeholder="Sensor ID" />
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Lens ID</label>
                                <input id="lens" className="uk-input" type="number" placeholder="Lens ID" />
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Content type</label>
                                <select id="content" className="uk-select">
                                    <option>Not chosen</option>
                                    {
                                        form.contentTypes.map((type) => (
                                            <option value={type.type}>{type.type}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="uk-margin">
                                <div uk-form-custom="">
                                    <input id='file' type="file" name='file'/>
                                    <button className="uk-button uk-button-primary" type="button" tabIndex="-1">
                                        Выбрать файл
                                    </button>
                                </div>
                            </div>

                            <div className="uk-margin">
                                <a className='uk-link-muted' onClick={() => setHidden(!hidden)}>
                                    {hidden ? <span uk-icon='chevron-down'></span> :
                                        <span uk-icon='chevron-up'></span>} Дополнительно</a>
                            </div>

                            {
                                hidden ? '' :
                                    <Hidden
                                        resourceTypes = {form.resourceTypes}
                                    />
                            }

                            <p className="uk-text-right">
                                <button className="uk-button uk-button-default uk-modal-close" type="button">Отмена
                                </button>
                                <input className='uk-button uk-button-primary' type="submit" value='Добавить'/>
                            </p>

                        </fieldset>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Main