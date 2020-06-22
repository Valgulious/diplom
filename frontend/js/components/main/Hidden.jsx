import React from 'react'

const Hidden = () => {
    return(
        <div>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Resource type</label>
                <select className="uk-select">
                    <option>Option 01</option>
                    <option>Option 02</option>
                </select>
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Color temperature</label>
                <input className="uk-input" type="number" placeholder="Color temperature" />
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">AE target</label>
                <input className="uk-input" type="number" placeholder="AE target" />
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Sensor gain</label>
                <input className="uk-input" type="number" placeholder="Sensor gain" />
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Shutter time</label>
                <input className="uk-input" type="number" placeholder="Shutter time" />
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Sensor submode</label>
                <input className="uk-input" type="number" placeholder="Sensor submode" />
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Comment</label>
                <textarea id='desc' className="uk-textarea" name='comment' rows="5"
                                             placeholder="Комментарий" required></textarea>
            </div>

        </div>
    );
}

export default Hidden