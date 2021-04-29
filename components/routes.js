import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Register from '../containers/register.js';
import Login from '../containers/login.js';
import Feed from '../containers/feed.js';
import {Profiles} from '../containers/friends.js';
import {Profile} from '../containers/profile.js';
import UpdateProfile from '../containers/updateProfile.js';
import {PublicRoute} from './publicroute.js';
import {PrivateRoute} from './privateroute.js';
import {AdmonRoute} from './admonroute.js';
import {UsersAdmon} from '../containers/users.js';
import {NotFound} from '../components/404.jsx';


export const Routes=()=>(

        <Switch>
                <PublicRoute exact path="/" component={Register} />
                <PublicRoute exact path="/login" component={Login} />
                <PrivateRoute exact path="/feed" component={Feed} />
                <PrivateRoute exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/search-profiles" component={Profiles} />
                <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
                <AdmonRoute exact path="/users" component={UsersAdmon} />
                <Route component={()=><NotFound />} />
        </Switch>
    
);
