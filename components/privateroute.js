import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {PrivateMenu} from './menu.js';
import {Loader} from './loader.js';


    export const PrivateRoute=({
            component: Component,
            ...rest
        }) => {

                const userSession=useSelector(data=>data.handleSessionUser);
                const {token, id} =userSession.user;
                
                const loader=useSelector(data=>data.loader);
                const {isLoaderActive} =loader;
                
                
                if(isLoaderActive){
                        return(<Loader />);
                }
                
                if(!isLoaderActive){
                return(    
                        <Route {...rest} component={(props) => (
                                (id && token) 
                                ?       (<>
                                                <PrivateMenu />
                                                <Component {...props} />
                                        </>
                                        )
                                : (<Redirect to="/login" />)
                                )} />
                        );}
        }