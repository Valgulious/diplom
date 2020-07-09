import React, { useEffect, useState } from 'react'
import SearchForm from "../forms/SearchForm.jsx";

const Search = () => {

    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const [projects, setProjects] = useState([]);

    let handleOnChange = (e) => {

        if (!e.target.value) {
            setVisible(false);
        } else {
            fetch('http://localhost:8080/api/search/findByTitle?title=' + e.target.value)
                .then(res => res.json())
                .then(res => {
                    setProjects(res);
                })

            setVisible(true);
            setValue(e.target.value);
        }
    }


    return(
        <div className='uk-margin-small-top uk-margin-small-bottom' uk-grid=''>
            <div className='uk-width-1-6 uk-margin-small-left uk-margin-small-right'></div>
            <div className='uk-width-expand uk-margin-right'>
                <div className='uk-width-1-2 uk-align-center'>
                    <input
                        className='uk-input uk-width-expand'
                        type="text"
                        placeholder='Search in storage'
                        onChange={handleOnChange}
                    />
                    {
                        visible ? <div className='uk-card uk-card-default uk-card-body
                                    uk-position-absolute uk-position-z-index search-results'>
                            {
                                projects.map((project) => (
                                    <div className='uk-width-expand uk-flex search-margin folder'>
                                        <a className='uk-link-text uk-width-expand' href={"/" + project.title}>
                                            <div className='uk-width-expand search-margin in-folder'>
                                                <img src="https://img.icons8.com/ios/30/000000/folder-invoices--v2.png"/> {project.title}
                                            </div>
                                        </a>
                                    </div>
                                ))
                            }
                        </div> : ''
                    }
                    <a className='uk-link-text' uk-toggle="target: #searchForm">Advanced search</a>
                    <SearchForm/>
                </div>
            </div>
        </div>
    );
}

export default Search;