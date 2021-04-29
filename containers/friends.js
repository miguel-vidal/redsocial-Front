import React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'; //1. traer estado global, 2. ejecutar accion desde UI (interfaz de usuario)
import {getProfiles} from '../actions/UserActions.js'
import {Link} from 'react-router-dom';
import {Loader} from '../components/loader.js';
import img from '../assets/none.jpg';
import {PATH_IMAGE_SERVER} from '../config/config.js';

export const Profiles=()=>{
    const dispatch=useDispatch();
    const stateGetProfiles=useSelector(state=> state.getProfiles); 
    const { loadingProfiles, profiles, successProfiles,errorProfiles}=stateGetProfiles;
    const statehandleSessionUser=useSelector(state=> state.handleSessionUser); 
    const {token,id}=statehandleSessionUser.user;
    
    useEffect(()=>{
        dispatch(getProfiles(token));
    },[]);

    return(
            <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full antialiased">
                <div className="mt-3 flex flex-col" style={{marginTop:'5em'}}>
                    <h2 className="title">Personas que quiza conozcas</h2>
                    {(loadingProfiles) && <Loader />}
                    {(successProfiles  && profiles.message) && <div><p className="text-color-white">No hay perfiles disponibles</p></div>}
                    {(errorProfiles && errorProfiles.length>0) && <div><p className="text-color-white">Error 500 Error de Servidor</p></div>}
                    {
                        (successProfiles  && !profiles.message) && profiles.map((profileUser,idx)=>{
                                    if(id !== profileUser.user.id){
                                            return(
                                            <div className="top-post" style={{height:'auto'}} key={idx}>     
                                                <img style={{width:'70px', height:'70px'}} className="border border-indigo-100 shadow-lg round" 
                                                src={(profileUser.photo) 
                                                ? `${PATH_IMAGE_SERVER}/profiles/${profileUser.user.email}/${profileUser.photo}`  
                                                : img} alt="profile-img" />
                                                <p className="username" style={{float:'none'}}>
                                                    <Link to={`/profile/${profileUser.user.id}`}>@{profileUser.user.name}</Link>
                                                </p>
                                                <p>{profileUser.description}</p>
                                            </div>)
                                        }
                                    })
                    }
                </div>
            </div>
    );
}