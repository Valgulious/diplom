import React, { useState, useEffect } from 'react';
import ContentInfo from "../info/ContentInfo.jsx";

const SearchComponent = () => {

    const [flag, setFlag] = useState(true);
    const [visible, setVisible] = useState(false);
    const [contentId, setContentId] = useState('');


    const [content, setContent] = useState([]);
    useEffect(() => {

        let search = {
            searchProject: sessionStorage.getItem('searchProject'),
            searchPhase: sessionStorage.getItem('searchPhase'),
            searchSettings: sessionStorage.getItem('searchSettings'),
            searchSensor: sessionStorage.getItem('searchSensor'),
            searchLens: sessionStorage.getItem('searchLens'),
            searchContent: sessionStorage.getItem('searchContent'),
            searchResource: sessionStorage.getItem('searchResource'),
            searchColor: sessionStorage.getItem('searchColor'),
            searchAE: sessionStorage.getItem('searchAE'),
            searchGain: sessionStorage.getItem('searchGain'),
            searchShutter: sessionStorage.getItem('searchShutter'),
            searchSubmod: sessionStorage.getItem('searchSubmod'),
        }

        let url = 'http://localhost:8080/api/search?searchProject=' + search.searchProject +
            '&searchPhase=' + search.searchPhase + '&searchSettings=' + search.searchSettings +
            '&searchSensor=' + search.searchSensor + '&searchLens=' + search.searchLens +
            '&searchContent=' + search.searchContent + '&searchResource=' + search.searchResource +
            '&searchColor=' + search.searchColor + '&searchAE=' + search.searchAE + '&searchGain=' + search.searchGain +
            '&searchShutter=' + search.searchShutter + '&searchSubmod=' + search.searchSubmod;

        sessionStorage.setItem('url', url);

        fetch(url)
            .then(res => res.json())
            .then(res => {
                setContent(res);
                console.log(res);
            })
    }, []);

    let handleOnClick = (e) => {
        setVisible(true);
        setContentId(e.target.id);
        console.log('click');
    }

    // let handleOnClickDownload = () => {
    //
    // }

    let handleOnClickDiv = () => {
        if (flag) {
            setVisible(false);
            console.log('click div');
        }
    }

    let handleOnMouseOver = () => {
        setFlag(false);
    }

    let handleOnMouseOut = () => {
        setFlag(true);
    }

    let handleClickDeleteProject = () => {
        fetch('http://localhost:8080/api/projects/' + id, {method: 'delete'})
    }

    let searchReload = () => {
        setVisible(false);
        fetch(sessionStorage.getItem('url'))
            .then(res => res.json())
            .then(res => {
                setContent(res);
                console.log(res);
            })
    }

    return(
        <div>
            <div uk-grid=''>
                <div className='uk-width-1-6 uk-text-center uk-margin-left uk-margin-right'>
                    {
                        visible ? <ContentInfo id={contentId} projectReload={searchReload}/> : ''
                    }
                </div>
                <div className='uk-width-expand uk-card uk-card-default uk-card-body uk-margin-right'>
                    <h3>
                        <a href='/' uk-icon="icon: arrow-left; ratio: 1.5"></a>
                        Searching results
                        <a className='uk-link-text' uk-icon="download" href={'/api/search/download?contents[]=' + content}></a>
                    </h3>
                    <div id='projects' className='uk-grid-column-small uk-grid-row-small uk-text-center' uk-grid=''>
                        {
                            content.map((cont) => (
                                <div onClick={handleOnClick}>
                                    <span uk-icon='icon: file; ratio: 3'></span>
                                    <p id={cont.id}>
                                        {
                                            cont.title.length > 22 ?
                                                cont.title.substr(0,22) + '...' :
                                                cont.title
                                        }
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SearchComponent;