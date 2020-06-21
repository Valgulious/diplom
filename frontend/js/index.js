import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, BrowserRouter } from "react-router-dom";
import Body from './components/Body.jsx';


ReactDOM.render(
    <BrowserRouter>
        <Body/>
    </BrowserRouter>,
    document.getElementById('root')
);