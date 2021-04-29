import {SERVER} from '../config/config.js'
import axios from 'axios';

    export const signIn=(user)=>async(dispatch)=>{
        try{
            dispatch({
                type:"AUTH_REQUEST",
                payload:user
            });

            const response =await axios.post(`${SERVER}/login`,user);
            /**
             * axios devuelve el objeto response con data adicional
             * {config:{}
             * data: {id,email, name, role_id,token, profile:{}, role:{}}
             * headers:{},
             * status:200,
             * statusCode:"OK"
             * }
             */
             if(response.data.error){
                
                dispatch({
                    type:"VALIDATION_ERROR",
                    payload:response.data
                });
             }else if(response.data.id){
                dispatch({
                    type:"AUTH_SUCCESS",
                    payload:response.data
                });
            }

        }catch(error){
            
            dispatch({
                type:"AUTH_FAIL",
                payload:"error 500"
            });

        }

    }


    export const signUp=(newUser)=>async(dispatch)=>{
        
        try{
                dispatch({
                    type:"REGISTER_USER_REQUEST",
                    payload:newUser
                });

                const response =await axios.post(`${SERVER}/register`,newUser);

                if(response.data.error){
                
                    dispatch({
                        type:"VALIDATION_SIGNUP_ERROR",
                        payload:response.data
                    });

                 }else if(response.data.success){
                    dispatch({
                        type:"REGISTER_USER_SUCCESS",
                        payload:response.data
                    });
                 }
                
        }catch(error){
            
                dispatch({
                    type:"REGISTER_USER_FAIL",
                    payload:"error de servidor"
                });
        }

    }



    //metodo que guarda el token y el email en el state de handleSession en /authReducers.js. metodo ejecutado por login
    export const handleUserSession=(token, email,idUser,name)=>{
                return {
                    type:"SAVE_SESSION_USER",
                    payload: {
                        token_user:token,
                        email_user:email,
                        id_user:idUser,
                        name_user:name
                    }
                }
    }

    
    //estado lo borra en handleSession()
    export const destroySession=(token)=>async(dispatch)=>{

            dispatch({
                    type:"DESTROY_SESSION_USER"
                });

    }

    //reducer authReducers.js  setLoader
    export const setLoader=()=>{
            return {
                type:"SET_LOADER"
            }
    }