import React, { useEffect, useState } from 'react'

const ContentInfo = ({ id, projectReload }) => {

    const [content, setContent] = useState({});
    useEffect(() => {
        fetch('http://localhost:8080/api/content/' + id)
            .then(res => res.json())
            .then(res => {
                setContent(res);
                console.log(res);
            })
    }, [id]);

    let handleClickDownload = () => {
        download(content.downloadLink);
    }

    let handleClickDelete = () => {
        fetch('http://localhost:8080/api/content/' + id, {method: 'delete'})
            .then(res => {
                if (res.status === 200) {
                    projectReload()
                }
            })
    }

    return(
        <div className='uk-card uk-card-default c-info'>
            <div className='uk-card-header'>
                <div  className='uk-flex uk-flex-around'>
                    <div>
                        <span className='uk-link' uk-icon="download" onClick={handleClickDownload}></span>
                    </div>
                    <div>
                        <span className='uk-link' uk-icon="trash" onClick={handleClickDelete}></span>
                    </div>
                </div>
            </div>
            <div className='uk-card-body'>
                <div uk-grid=''>
                    <div className='uk-width-1-2 uk-text-left info'>
                        <p>Project:</p>
                        <p>Phase:</p>
                        <p>Settings:</p>
                        <p>Sensor ID:</p>
                        <p>Lens ID:</p>
                        <p>Content type:</p>
                        { content.resourceType ? <p>Resource type:</p> : '' }
                        { content.colorTemperature !== -1 ? <p>Color temperature:</p> : ''  }
                        { content.aeTarget !== -1 ? <p>Ae target:</p> : ''  }
                        { content.sensorGain !== -1 ? <p>Sensor gain:</p> : ''  }
                        { content.shutterTime !== -1 ? <p>Shutter time:</p> : ''  }
                        { content.sensorSubmod !== -1 ? <p>Sensor submod:</p> : ''  }
                        { content.comment ? <p>Comment:</p> : '' }
                        <p>Create date:</p>
                        <p>Size:</p>
                    </div>
                    <div className='uk-width-1-2 uk-text-left info'>
                        <p>{content.project}</p>
                        <p>{content.phase}</p>
                        <p>{content.settings}</p>
                        <p>{content.sensorID}</p>
                        <p>{content.lensID}</p>
                        <p>{content.contentType}</p>
                        { content.resourceType ? <p>{content.resourceType}</p> : '' }
                        { content.colorTemperature !== -1 ? <p>{content.colorTemperature}</p> : ''  }
                        { content.aeTarget !== -1 ? <p>{content.aeTarget}</p> : ''  }
                        { content.sensorGain !== -1 ? <p>{content.sensorGain}</p> : ''  }
                        { content.shutterTime !== -1 ? <p>{content.shutterTime}</p> : ''  }
                        { content.sensorSubmod !== -1 ? <p>{content.sensorSubmod}</p> : ''  }
                        { content.comment ? <p>{content.comment}</p> : '' }
                        <p>{content.createDate}</p>
                        <p>{(content.size / (1024 * 1024)).toFixed(1)} MB</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentInfo;