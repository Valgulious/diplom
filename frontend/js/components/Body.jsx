import React from 'react'
import {Switch, Route} from "react-router";
import Main from './main/Main.jsx'
import Edit from "./edit/Edit.jsx";
// import FullCatalog from './catalog/FullCatalog.jsx'
// import Sight from'./catalog/Sight.jsx'
// import Routes from './routes/Routes.jsx'
// import Media from './media/Media.jsx'
// import About from './about/About.jsx'
// import Header from './header/Header.jsx'

const Body = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/edit' component={Edit}/>
                {/*<Route exact path='/catalog' component={FullCatalog}/>*/}
                {/*<Route exact path='/catalog/bytag/:id' component={FullCatalog}/>*/}
                {/*<Route exact path='/catalog/sights/:id' component={Sight}/>*/}
                {/*<Route exact path='/routes' component={Routes}/>*/}
                {/*<Route exact path='/media' component={Media}/>*/}
                {/*<Route exact path='/about' component={About}/>*/}
            </Switch>
        </div>
    );
};

export default Body;