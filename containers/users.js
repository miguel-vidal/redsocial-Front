import React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'; //1. traer estado global, 2. ejecutar accion desde UI (interfaz de usuario)
import {getUsers,deleteUser} from '../actions/UserActions.js'
import {Loader} from '../components/loader.js';

export const UsersAdmon=()=>{
    const dispatch=useDispatch();
    const stateGetUsers=useSelector(state=> state.getUsers); 
    const { loadingUsers, users, successUsers,errorUsers}=stateGetUsers;
    const stateDeleteUser=useSelector(state=> state.deleteUser); 
    const { loadingDeleteUsers,userDelete,errorDeleteUsers}=stateDeleteUser;
    const statehandleSessionUser=useSelector(state=> state.handleSessionUser); 
    const {token}=statehandleSessionUser.user;
    
    useEffect(()=>{

        if(userDelete && userDelete.success){
            dispatch(getUsers(token));    
        }
    },[userDelete]);

    useEffect(()=>{
        dispatch(getUsers(token));
    },[]);

    return(
            <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full antialiased">
                <div className="mt-3 flex flex-col" 
                                    style={{marginTop:'5em'}}>
                    {(loadingUsers || loadingDeleteUsers) && <Loader />}
                    {(successUsers  && users.message) && <div><p className="text-color-white">No hay perfiles disponibles</p></div>}
                    {(errorUsers && errorUsers.length>0) && <div><p className="text-color-white">Error 500 Error de Servidor</p></div>}
                    {(errorDeleteUsers && errorDeleteUsers.length>0) && <div><p className="text-color-white">Error 500 Error de Servidor</p></div>}
                    {(successUsers  && !users.message) && users.map((user,idx)=>(
                                    <div className="top-post"  style={{height:'auto'}}  key={idx}>     
                                        <p>id: {user.id}</p>
                                        <p>name: {user.name}</p>
                                        <p>email: {user.email}</p>
                                        <p>total de comentarios: {(user.comments && user.comments.length > 0) ? user.comments.length : 0}</p>
                                        <p>total de imagenes: {(user.image && user.image.length >0 ) ? user.image.length : 0}</p>
                                        <p>total de posts: {(user.post && user.post.length >0 ) ? user.post.length : 0}</p>
                                        <p>Ya tiene su perfil? : {(user.profile && user.profile.id ) ? "SI" : "NO"}</p>
                                        <button style={{background:'red', width:'fit-content', display:(user.email === "admin@administrationred.com") ? 'none':'block' }}
                                          onClick={()=>{
                                               dispatch(deleteUser(user.id,token));                                             
                                        }}>Eliminar</button>
                                    </div>
                                )
                            )
                    }
                </div>
            </div>
    );
}