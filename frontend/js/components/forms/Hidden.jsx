import React from 'react'

const Hidden = ({ resourceTypes }) => {

    let handleOnChange = (e) => {
       sessionStorage.setItem(e.target.id, e.target.value);
       e.target.value = sessionStorage.getItem(e.target.id);
    }

    return(
        <div>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Resource type</label>
                <select id="hiddenResource" name="resourceType" className="uk-select"
                        value={sessionStorage.getItem('hiddenResource')} onChange={handleOnChange}>
                    <option value="">Not chosen</option>
                    {
                        resourceTypes.map((type) => (
                            <option value={type.resource}>{type.resource}</option>
                        ))
                    }
                </select>
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Color temperature</label>
                <input id="hiddenColor"
                       className="uk-input"
                       name="colorTemperature"
                       type="number"
                       placeholder="Color temperature"
                       value={sessionStorage.getItem('hiddenColor')}
                       onChange={handleOnChange}
                />
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">AE target</label>
                <input id="hiddenAE"
                       className="uk-input"
                       name="aeTarget"
                       type="number"
                       placeholder="AE target"
                       value={sessionStorage.getItem('hiddenAE')}
                       onChange={handleOnChange}
                />
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Sensor gain</label>
                <input id="hiddenGain"
                       className="uk-input"
                       type="number"
                       name="sensorGain"
                       placeholder="Sensor gain"
                       value={sessionStorage.getItem('hiddenGain')}
                       onChange={handleOnChange}
                />
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Shutter time</label>
                <input id="hiddenShutter"
                       className="uk-input"
                       name="shutterTime"
                       type="number"
                       placeholder="Shutter time"
                       value={sessionStorage.getItem('hiddenShutter')}
                       onChange={handleOnChange}
                />
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Sensor submode</label>
                <input id="hiddenSubmod"
                       className="uk-input"
                       name="sensorSubmod"
                       type="number"
                       placeholder="Sensor submode"
                       value={sessionStorage.getItem('hiddenSubmod')}
                       onChange={handleOnChange}
                />
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Comment</label>
                <textarea id='hiddenComment' className="uk-textarea" name='comment' rows="5"
                                             placeholder="Comment" value={sessionStorage.getItem('hiddenComment')}
                          onChange={handleOnChange}></textarea>
            </div>

        </div>
    );
}

export default Hidden