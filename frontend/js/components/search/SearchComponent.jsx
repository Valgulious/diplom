import React, { useState, useEffect } from 'react';
import ContentInfo from "../info/ContentInfo.jsx";

const SearchComponent = () => {

    const [flag, setFlag] = useState(true);
    const [visible, setVisible] = useState(false);
    const [contentId, setContentId] = useState('');


    const [content, setContent] = useState([]);
    useEffect(() => {

        let search = {
            searchProject: localStorage.getItem('searchProject'),
            searchPhase: localStorage.getItem('searchPhase'),
            searchSettings: localStorage.getItem('searchSettings'),
            searchSensor: localStorage.getItem('searchSensor'),
            searchLens: localStorage.getItem('searchLens'),
            searchContent: localStorage.getItem('searchContent')
        }

        let url = 'http://localhost:8080/api/search?searchProject=' + search.searchProject +
            '&searchPhase=' + search.searchPhase + '&searchSettings=' + search.searchSettings +
            '&searchSensor=' + search.searchSensor + '&searchLens=' + search.searchLens +
            '&searchContent=' + search.searchContent;

        console.log('searchProject = ' + localStorage.getItem('searchProject'));
        console.log('searchPhase = ' + localStorage.getItem('searchPhase'));
        console.log('searchSettings = ' + localStorage.getItem('searchSettings'));
        console.log('searchSensor = ' + localStorage.getItem('searchSensor'));
        console.log('searchLens = ' + localStorage.getItem('searchLens'));
        console.log('searchContent = ' + localStorage.getItem('searchContent'));

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
        fetch('http://localhost:8080/api/projects/' + id)
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
                        <a className='uk-link-text' uk-icon="download"></a>
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