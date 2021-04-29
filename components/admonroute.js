import React from 'react';
import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {PrivateMenu} from './menu.js';
import {Loader} from './loader.js';
import {NotFound} from './404.jsx';

    export const AdmonRoute=({
            component: Component,
            ...rest
        }) => {

                const userSession=useSelector(data=>data.handleSessionUser);
                const { token, id, email} =userSession.user;
                
                const loader=useSelector(data=>data.loader);
                const {isLoaderActive} =loader;
                
                
                if(isLoaderActive){
                        return(<Loader />);
                }
                
                if(!isLoaderActive){
                return(    
                        <Route {...rest} component={(props) => (
                                (id && token && (email === "admin@administrationred.com")) 
                                ?       (<>
                                                <PrivateMenu />
                                                <Component {...props} />
                                        </>
                                        )
                                : <NotFound/>
                                )} />
                        );}
        }