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

const UploadForm = () => {

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

        let formData = new FormData();

        let project = document.getElementById('project');
        let phase = document.getElementsByName('phase');
        let set = document.getElementsByName('settings');
        let sensor = document.getElementById('sensor');
        let lens = document.getElementById('lens');
        let content = document.getElementById('content');
        let file = document.getElementById('file');
        // let resource = document.getElementById('hiddenResource');
        // let color = document.getElementById('hiddenColor');
        // let ae = document.getElementById('hiddenAE');
        // let gain = document.getElementById('hiddenGain');
        // let shutter = document.getElementById('hiddenShutter');
        // let submod = document.getElementById('hiddenSubmod');
        // let comment = document.getElementById('hiddenComment');

        formData.append(project.name, project.value);
        phase.forEach(element => {
            if (element.checked) formData.append(element.name, element.value);
        })
        set.forEach(element => {
            if (element.checked) formData.append(element.name, element.value);
        })
        formData.append(sensor.name, sensor.value);
        formData.append(lens.name, lens.value);
        formData.append(content.name, content.value);

        console.log(file.files);

        for (const f of file.files ) {
            formData.append(file.name, f);
        }

        if (sessionStorage.getItem('hiddenResource')) {
            formData.append('resourceType', sessionStorage.getItem('hiddenResource'));
        } else {
            formData.append('resourceType', '');
        }

        if (sessionStorage.getItem('hiddenColor')) {
            formData.append('colorTemperature', sessionStorage.getItem('hiddenColor'));
        } else {
            formData.append('colorTemperature', '');
        }

        if (sessionStorage.getItem('hiddenAE')) {
            formData.append('aeTarget', sessionStorage.getItem('hiddenAE'));
        } else {
            formData.append('aeTarget', '');
        }

        if (sessionStorage.getItem('hiddenGain')) {
            formData.append('sensorGain', sessionStorage.getItem('hiddenGain'));
        } else {
            formData.append('sensorGain', '');
        }

        if (sessionStorage.getItem('hiddenShutter')) {
            formData.append('shutterTime', sessionStorage.getItem('hiddenShutter'));
        } else {
            formData.append('shutterTime', '');
        }

        if (sessionStorage.getItem('hiddenSubmod')) {
            formData.append('sensorSubmod', sessionStorage.getItem('hiddenSubmod'));
        } else {
            formData.append('sensorSubmod', '');
        }

        if (sessionStorage.getItem('hiddenComment')) {
            formData.append('comment', sessionStorage.getItem('hiddenComment'));
        } else {
            formData.append('comment', '');
        }

        fetch('http://localhost:8080/api/content', {
            method: 'post',
            body: formData
        });

        sessionStorage.clear();
    }

    return (
            <div id="uploadForm" uk-modal="">
                <div className="uk-modal-dialog uk-modal-body">
                    <form id="upload" onSubmit={handleSubmit}>

                        <fieldset className='uk-fieldset'>

                            <legend className="uk-legend">Upload content</legend>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Project</label>
                                <select id='project' name="project" className="uk-select" required>
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
                                                       name="phase"
                                                       value={phase.title}
                                                       required
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
                                                       name="settings"
                                                       value={set.title}
                                                       required
                                                />
                                                {set.title}
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Sensor ID</label>
                                <input id="sensor"
                                       className="uk-input"
                                       name="sensorID"
                                       type="number"
                                       placeholder="Sensor ID"
                                       min="0"
                                       max="999999"
                                       required
                                />
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Lens ID</label>
                                <input id="lens"
                                       className="uk-input"
                                       name="lensID"
                                       type="number"
                                       placeholder="Lens ID"
                                       min="0"
                                       max="999999"
                                       required
                                />
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Content type</label>
                                <select id="content" className="uk-select" name="contentType" required>
                                    <option value="">Not chosen</option>
                                    {
                                        form.contentTypes.map((type) => (
                                            <option value={type.type}>{type.type}</option>
                                        ))
                                    }
                                </select>
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

                            <div className="uk-margin">
                                <div uk-form-custom="">
                                    <input id='file' type="file" name='files[]' multiple required/>
                                    <button className="uk-button uk-button-primary" type="button" tabIndex="-1">
                                        Add files
                                    </button>
                                </div>
                            </div>

                            <p className="uk-text-right">
                                <input className='uk-button uk-button-primary' type="submit" value='Upload'/>
                                <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel
                                </button>
                            </p>

                        </fieldset>

                    </form>
                </div>
            </div>
    );
}

export default UploadForm