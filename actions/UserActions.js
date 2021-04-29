import axios from 'axios';
import {SERVER} from '../config/config.js';


//metodo para Administrador
export const getUsers=(token)=>async(dispatch)=>{

  try{

      dispatch({
        type:"GET_ALL_USERS_REQUEST"
      });

       const response=await axios.get(`${SERVER}/admin/`,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
      });
       dispatch({
         type:"GET_ALL_USERS_SUCCESS",
         payload:response.data
       });
  
    }catch(error){
      dispatch({
        type:"GET_ALL_USERS_FAIL",
        payload:{error:error.message}
      });
    }
}


//metodo para Administrador
export const deleteUser=(id,token)=>async(dispatch)=>{

  try{

      dispatch({
        type:"DELETE_USER_REQUEST"
      });

       const response=await axios.delete(`${SERVER}/admin/${id}`,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
      });
      
       dispatch({
         type:"DELETE_USER_SUCCESS",
         payload:response.data
       });
  
    }catch(error){
      dispatch({
        type:"DELETE_USER_FAIL",
        payload:{error:error.message}
      });
    }

}

export const getProfiles=(token)=>async(dispatch)=>{

  try{

      dispatch({
        type:"GET_PROFILES_REQUEST"
      });

       const response=await axios.get(`${SERVER}/profiles/`,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
      });
       dispatch({
         type:"GET_PROFILES_SUCCESS",
         payload:response.data
       });
  
    }catch(error){
      dispatch({
        type:"GET_PROFILES_FAIL",
        error:{error:error.message}
      });
    }

}


export const getProfile=(idUser,token)=> async(dispatch)=>{
  try{
    
      dispatch({
        type:"GET_USER_REQUEST"
        });

      //hago mi peticion a la BD
      const res=await axios.get(`${SERVER}/profiles/${idUser}`,{
          headers:{
              "Authorization":`Bearer ${token}`
          }
      });
      
      if(res.data.id || res.data.message){
          //uso costante y le asigno el payload, el type: es como un id. el payload es la data
          dispatch({
              type:"GET_USER_SUCCESS", 
              payload:res.data
            });
      }
      
  }catch(error){
      dispatch({type:"GET_USER_FAIL", payload: error.message});
  }
}


export const saveProfileAction=(profile,token)=>async(dispatch)=>{

  try{

      dispatch({
        type:"POST_PROFILE_REQUEST"
      });
       
      const response=await axios.post(`${SERVER}/profiles/profile`, 
                          profile,{
                          headers:{
                              'Authorization':`Bearer ${token}`
                          }
                });        
          
      if(response.data.success || response.data.error_validation){
            dispatch({
              type:"POST_PROFILE_SUCCESS",
              payload:response.data
          }); 
      }
  
    }catch(error){
      dispatch({
        type:"POST_PROFILE_ERROR",
        payload:{error:error.message}
      });
    }
}

export const updateProfileAction=(profile,token)=>async(dispatch)=>{

  try{

      dispatch({
        type:"UPDATE_PROFILE_REQUEST"
      });
       
      const response=await axios.post(`${SERVER}/profiles/`, 
                          profile,{
                          headers:{
                              'Authorization':`Bearer ${token}`
                          }
                });        
      if(response.data.success || response.data.error_validation){
            dispatch({
              type:"UPDATE_PROFILE_SUCCESS",
              payload:response.data
          }); 
      }
  
    }catch(error){
      dispatch({
        type:"UPDATE_PROFILE_ERROR",
        payload:{error:error.message}
      });
    }
}

