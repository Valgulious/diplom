import React from 'react'

const Hidden = ({ resourceTypes, comment }) => {

    let handleOnChange = (e) => {
       sessionStorage.setItem(e.target.id, e.target.value);
       e.target.value = sessionStorage.getItem(e.target.id);
    }

    return(
        <div>
            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Resource type</label>
                <div className='uk-form-controls'>
                    <select id="hiddenResource" name="resourceType" className="uk-select uk-form-small uk-form-width-medium"
                            value={sessionStorage.getItem('hiddenResource')} onChange={handleOnChange}>
                        <option value="">Not chosen</option>
                        {
                            resourceTypes.map((type) => (
                                <option value={type.resource}>{type.resource}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Color temperature</label>
                <div className='uk-form-controls'>
                    <input id="hiddenColor"
                           className="uk-input uk-form-small uk-form-width-medium"
                           name="colorTemperature"
                           type="number"
                           placeholder="Color temperature"
                           value={sessionStorage.getItem('hiddenColor')}
                           onChange={handleOnChange}
                    />
                </div>
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">AE target</label>
                <div className='uk-form-controls'>
                    <input id="hiddenAE"
                           className="uk-input uk-form-small uk-form-width-medium"
                           name="aeTarget"
                           type="number"
                           placeholder="AE target"
                           value={sessionStorage.getItem('hiddenAE')}
                           onChange={handleOnChange}
                    />
                </div>
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Sensor gain</label>
                <div className='uk-form-controls'>
                    <input id="hiddenGain"
                           className="uk-input uk-form-small uk-form-width-medium"
                           type="number"
                           name="sensorGain"
                           placeholder="Sensor gain"
                           value={sessionStorage.getItem('hiddenGain')}
                           onChange={handleOnChange}
                    />
                </div>
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Shutter time</label>
                <div className='uk-form-controls'>
                    <input id="hiddenShutter"
                           className="uk-input uk-form-small uk-form-width-medium"
                           name="shutterTime"
                           type="number"
                           placeholder="Shutter time"
                           value={sessionStorage.getItem('hiddenShutter')}
                           onChange={handleOnChange}
                    />
                </div>
            </div>

            <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">Sensor submode</label>
                <div className='uk-form-controls'>
                    <input id="hiddenSubmod"
                           className="uk-input uk-form-small uk-form-width-medium"
                           name="sensorSubmod"
                           type="number"
                           placeholder="Sensor submode"
                           value={sessionStorage.getItem('hiddenSubmod')}
                           onChange={handleOnChange}
                    />
                </div>
            </div>

            {
                comment ?
                    <div className="uk-margin">
                        <label className="uk-form-label" htmlFor="form-stacked-text">Comment</label>
                        <div className='uk-form-controls'>
                    <textarea id='hiddenComment' className="uk-textarea uk-form-small uk-form-width-medium" name='comment' rows="3"
                              placeholder="Comment" value={sessionStorage.getItem('hiddenComment')}
                              onChange={handleOnChange}></textarea>
                        </div>
                    </div> : ''
            }

        </div>
    );
}

export default Hidden