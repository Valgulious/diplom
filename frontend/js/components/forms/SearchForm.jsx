import React, { useState, useEffect } from 'react'
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

const SearchForm = () => {

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

        localStorage.clear();

        let project = document.getElementById('searchProject');
        let phase = document.getElementsByName('searchPhase');
        let set = document.getElementsByName('searchSettings');
        let sensor = document.getElementById('searchSensor');
        let lens = document.getElementById('searchLens');
        let content = document.getElementById('searchContent');

        localStorage.setItem(project.name, project.value);
        phase.forEach(element => {
            if (element.checked) localStorage.setItem(element.name, element.value);
        })

        if (!localStorage.getItem('searchPhase')) {
            localStorage.setItem('searchPhase', '');
        }

        set.forEach(element => {
            if (element.checked) localStorage.setItem(element.name, element.value);
        })

        if (!localStorage.getItem('searchSettings')) {
            localStorage.setItem('searchSettings', '');
        }

        localStorage.setItem(sensor.name, sensor.value);
        localStorage.setItem(lens.name, lens.value);
        localStorage.setItem(content.name, content.value);
        window.location = '/search';
    }

    return (
        <div id="searchForm" uk-modal="">
            <div className="uk-modal-dialog uk-modal-body">
                <form id="search" onSubmit={handleSubmit}>

                    <fieldset className='uk-fieldset'>

                        <legend className="uk-legend">Search content</legend>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">Project</label>
                            <select id='searchProject' name="searchProject" className="uk-select">
                                <option value="">Not chosen</option>
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
                                            <input className="uk-radio"
                                                   type="radio"
                                                   name="searchPhase"
                                                   value={phase.title}
                                            />
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
                                        <label>
                                            <input className="uk-radio"
                                                   type="radio"
                                                   name="searchSettings"
                                                   value={set.title}
                                            />
                                            {set.title}
                                        </label>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">Sensor ID</label>
                            <input id="searchSensor"
                                   className="uk-input"
                                   name="searchSensor"
                                   type="number"
                                   placeholder="Sensor ID"
                                   min="0"
                                   max="999999"
                            />
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">Lens ID</label>
                            <input id="searchLens"
                                   className="uk-input"
                                   name="searchLens"
                                   type="number"
                                   placeholder="Lens ID"
                                   min="0"
                                   max="999999"
                            />
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">Content type</label>
                            <select id="searchContent" className="uk-select" name="searchContent">
                                <option value="">Not chosen</option>
                                {
                                    form.contentTypes.map((type) => (
                                        <option value={type.type}>{type.type}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <Hidden
                            resourceTypes = {form.resourceTypes}
                        />

                        <p className="uk-text-right">
                            <input className='uk-button uk-button-primary' type="submit" value='Search'/>
                            <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel
                            </button>
                        </p>

                    </fieldset>

                </form>
            </div>
        </div>
    );

}

export default SearchForm;