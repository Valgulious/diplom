import React from 'react'
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div className='uk-position-center'>
            <div className='uk-margin-bottom'>
                <Link to='/edit'>
                    <button className="uk-button uk-button-primary uk-button-large">Редактирование базы знаний</button>
                </Link>
            </div>
            <div className='uk-align-center'>
                <Link to='/work'>
                    <button className="uk-button uk-button-primary uk-button-large">Мониторинг состояния больного</button>
                </Link>
            </div>
        </div>
    );
}

export default Main