import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Hidden from "./Hidden.jsx";

const defaultForm = {
    projects: [
        'Project 1',
        'Project 2'
    ],
    phase: [
        'Testing',
        'Calibration'
    ],
    settings: [
        'Default',
        'Factory'
    ],
    contentType: [
        'Type 1',
        'Type 2'
    ]
}

const Main = () => {

    const [hidden, setHidden] = useState(true);

    const [form, setForm] = useState(defaultForm);

    return (
        <div className='uk-position-center'>
            <div className='uk-margin-bottom'>
                <button className="uk-button uk-button-primary uk-button-large" uk-toggle="target: #form">Добавить</button>
            </div>
            <div id="form" uk-modal="">
                <div className="uk-modal-dialog uk-modal-body">
                    <form>

                        <fieldset className='uk-fieldset'>

                            <legend className="uk-legend">Добавление контента</legend>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Project</label>
                                <select className="uk-select">
                                    {
                                        form.projects.map((project) => (
                                            <option value={project}>{project}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Phase</label>
                                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    {
                                        form.phase.map((phase) => (
                                            <label><input className="uk-radio" type="radio" name="phase"/>{phase}</label>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Settings</label>
                                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    {
                                        form.settings.map((set) => (
                                            <label><input className="uk-radio" type="radio" name="settings"/>{set}</label>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Sensor ID</label>
                                <input className="uk-input" type="number" placeholder="Sensor ID" />
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Lens ID</label>
                                <input className="uk-input" type="number" placeholder="Lens ID" />
                            </div>

                            <div className="uk-margin">
                                <label className="uk-form-label" htmlFor="form-stacked-text">Content type</label>
                                <select className="uk-select">
                                    {
                                        form.contentType.map((type) => (
                                            <option value={type}>{type}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="uk-margin">
                                <div uk-form-custom="">
                                    <input id='file' type="file" name='file' required/>
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

                            {hidden ? '' : <Hidden/>}

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