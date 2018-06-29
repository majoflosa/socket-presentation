import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import MainRoom from './components/MainRoom/MainRoom';

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/mainroom" component={MainRoom} />
    </Switch>
);