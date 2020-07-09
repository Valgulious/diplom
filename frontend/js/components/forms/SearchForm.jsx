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

        sessionStorage.clear();

        let project = document.getElementById('searchProject');
        let phase = document.getElementsByName('searchPhase');
        let set = document.getElementsByName('searchSettings');
        let sensor = document.getElementById('searchSensor');
        let lens = document.getElementById('searchLens');
        let content = document.getElementById('searchContent');

        let resource = document.getElementById('hiddenResource');
        let color = document.getElementById('hiddenColor');
        let ae = document.getElementById('hiddenAE');
        let gain = document.getElementById('hiddenGain');
        let shutter = document.getElementById('hiddenShutter');
        let submod = document.getElementById('hiddenSubmod');


        sessionStorage.setItem(project.name, project.value);
        phase.forEach(element => {
            if (element.checked) sessionStorage.setItem(element.name, element.value);
        })

        if (!localStorage.getItem('searchPhase')) {
            sessionStorage.setItem('searchPhase', '');
        }

        set.forEach(element => {
            if (element.checked) sessionStorage.setItem(element.name, element.value);
        })

        if (!sessionStorage.getItem('searchSettings')) {
            sessionStorage.setItem('searchSettings', '');
        }

        sessionStorage.setItem(sensor.name, sensor.value);
        sessionStorage.setItem(lens.name, lens.value);
        sessionStorage.setItem(content.name, content.value);

        sessionStorage.setItem('searchResource', resource.value);
        sessionStorage.setItem('searchColor', color.value);
        sessionStorage.setItem('searchAE', ae.value);
        sessionStorage.setItem('searchGain', gain.value);
        sessionStorage.setItem('searchShutter', shutter.value);
        sessionStorage.setItem('searchSubmod', submod.value);

        window.location = '/search';
    }

    return (
        <div id="searchForm" uk-modal="">
            <div className="uk-modal-dialog uk-modal-body">
                <form id="search" className='uk-form-horizontal' onSubmit={handleSubmit}>

                    <fieldset className='uk-fieldset'>

                        <legend className="uk-legend">Search content</legend>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">Project</label>
                            <div className='uk-form-controls'>
                                <select id='searchProject' name="searchProject" className="uk-select uk-form-small uk-form-width-medium">
                                    <option value="">Not chosen</option>
                                    {
                                        form.projects.map((project) => (
                                            <option value={project.title}>{project.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
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
                            <div className='uk-form-controls'>
                                <input id="searchSensor"
                                       className="uk-input uk-form-small uk-form-width-medium"
                                       name="searchSensor"
                                       type="number"
                                       placeholder="Sensor ID"
                                       min="0"
                                       max="999999"
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">Lens ID</label>
                            <div className='uk-form-controls'>
                                <input id="searchLens"
                                       className="uk-input uk-form-small uk-form-width-medium"
                                       name="searchLens"
                                       type="number"
                                       placeholder="Lens ID"
                                       min="0"
                                       max="999999"
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-text">Content type</label>
                            <div className='uk-form-controls'>
                                <select id="searchContent" className="uk-select uk-form-small uk-form-width-medium" name="searchContent">
                                    <option value="">Not chosen</option>
                                    {
                                        form.contentTypes.map((type) => (
                                            <option value={type.type}>{type.type}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <Hidden
                            resourceTypes = {form.resourceTypes}
                            comment = {false}
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