import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'; //1. traer estado global, 2. ejecutar accion desde UI (interfaz de usuario)
import {getProfile} from '../actions/UserActions.js'
import {useParams} from 'react-router-dom';
import {Loader} from '../components/loader.js';
import UpdateProfile from './updateProfile.js';
import {ProfileUser} from './profileuser.js';
import img from'../assets/none.jpg';
import {PATH_IMAGE_SERVER} from '../config/config.js';
import {NotFound} from '../components/404';

export const Profile=()=>{
    const dispatch=useDispatch();
    const {id}=useParams(); //obtener lo que mandan en la url, el parametro :
    const stateGetProfile=useSelector(state=> state.getProfile); 
    const {  profile, successProfile,errorProfile}=stateGetProfile
    const statehandleSessionUser=useSelector(state=> state.handleSessionUser); 
    const {token,email,name}=statehandleSessionUser.user;
    const [isForUpdate, setIsForUpdate]=useState(false);
    useEffect(()=>{
        dispatch(getProfile(id,token));
    },[]);

    if(successProfile && profile.message){
        return(
            <NotFound />
        );
    }

    if(isForUpdate && (parseInt(id) === statehandleSessionUser.user.id)){
        let saveProfile=false;
        return(
            <UpdateProfile saveProfile={saveProfile} token={token} email={email}/>           
        );
    }
    
    if((successProfile && !profile.profile) && (parseInt(id) === statehandleSessionUser.user.id) ){
        let saveProfile=true;
        return(
            <UpdateProfile saveProfile={saveProfile} token={token} email={email}/>           
        );
    }

    if(successProfile && profile.profile){
        return(
            <div className="w-full bg-indigo-100 h-screen flex flex-row flex-wrap justify-center ">
                    <div style={{marginTop:'5em'}} className="profile-bar">
                                    <div className="p-5 bg-white ">
                                    <img className="border border-indigo-100 shadow-lg round" 
                                        src={(profile.profile.photo) 
                                        ? `${PATH_IMAGE_SERVER}/profiles/${profile.email}/${profile.profile.photo}`  
                                        : img} alt="profile-img"/>
                                        <div className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-600">
                                            {profile.name}
                                        </div>
                                    </div>    
                                    <div className=" antialiased flex flex-col hover:cursor-pointer">
                                        <p className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold">Mensajes</p>
                                        {
                                            (profile.email === email)
                                            && <p className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold"
                                            onClick={()=> setIsForUpdate(prevState=>!prevState)}>Actualizar Perfil</p>
                                        }
                                    </div>
                    </div>    
                    <div className="w-0 md:w-1/4 lg:w-1/5 h-0 md:h-screen overflow-y-hidden bg-white shadow-lg"
                        id="div-in-responsive"
                        style={{marginTop:'5em'}}>
                                  <div className="p-5 bg-white ">
                                        <img className="border border-indigo-100 shadow-lg round" 
                                        src={(profile.profile.photo) 
                                        ? `${PATH_IMAGE_SERVER}/profiles/${profile.email}/${profile.profile.photo}`  
                                        : img} alt="profile-img"/>
                                        <div className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-600">
                                            {profile.name}
                                        </div>
                                    </div>    
                                    <div className=" antialiased flex flex-col hover:cursor-pointer">
                                        <p className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold">Mensajes</p>
                                        {
                                            (profile.email === email)
                                            && <p className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold"
                                            onClick={()=> setIsForUpdate(prevState=>!prevState)}>Actualizar Perfil</p>
                                        }
                                    </div>
                    </div>
                    <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full antialiased">
                            <div className="w-full shadow rounded-lg p-5"
                                    style={{marginTop:'5em'}}>
                                <p className="profile-desc  hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold text-center ">{profile.name}</p>       
                                <p className="profile-desc   hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold">{profile.profile.age} años</p>                                       
                                <p className="profile-desc  hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold">{profile.profile.description}</p>
                                <ProfileUser idUser={id}/>
                            </div>
                    </div>
            </div>
        );
    }
    return(
        <Loader />
    );
}