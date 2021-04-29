import {SERVER} from '../config/config.js';

import axios from 'axios';

  //4. Hacer las actions
  export const listPosts=(token)=> async(dispatch)=>{
    try{
      
        dispatch({
          type:"POSTS_LIST_REQUEST"
          });

        //hago mi peticion a la BD
        const res=await axios.get(`${SERVER}/posts/`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        //uso costante y le asigno el payload, el type: es como un id. el payload es la data
        dispatch({
            type:"POSTS_LIST_SUCCESS", 
            payload:res.data
          });
        
    }catch(error){
        dispatch({type:"POST_REQUEST_FAIL", payload: error.message});
    }
  }

  export const listPostsByProfile=(id,token)=> async(dispatch)=>{
    try{      
        dispatch({
          type:"POSTS_PROFILE_LIST_REQUEST"
          });

        //hago mi peticion a la BD
        const res=await axios.get(`${SERVER}/posts/profile/${id}`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        //uso costante y le asigno el payload, el type: es como un id. el payload es la data
        dispatch({
            type:"POSTS_PROFILE_LIST_SUCCESS", 
            payload:res.data
          });
        
    }catch(error){
        dispatch({type:"POST_PROFILE_REQUEST_FAIL", payload: error.message});
    }
  }

  
  //add post
  export const savePost=(post, token, endpoint)=> async(dispatch)=>{
      
    try{
            dispatch({
              type:"PUBLICATION_POST_REQUEST", 
            });

        const response=await axios.post(`${SERVER}/posts/${endpoint}`, 
                          post,{
                          headers:{
                              'Authorization':`Bearer ${token}`
                          }
                });        
          
            dispatch({
              type:"PUBLICATION_POST_SUCCESS", 
              payload:response.data
            });
        
    }catch(error){
        dispatch({
          type:"PUBLICATION_REQUEST_FAIL", 
          payload:error.message
        });
    }
}

//ID DEL POST, token user, saber si borrara un post con una imagen
export const deletePost=(id, token,isImage)=>async(dispatch)=>{

  try{
    
    dispatch({
      type:"POST_DELETE_REQUEST",
      payload:id
    });

    const dropPost={
      id:`${id}`,
      image:`${isImage}`
    }
    const response=await axios.post(`${SERVER}/posts/delete`,
        dropPost,   
      {
        headers:{
          'Authorization':`Bearer ${token}`
        }
    });
    
    dispatch({
      type:"POST_DELETE_SUCCESS",
      payload:response.data
    });

  }catch(error){
    dispatch({
        type:"POST_DELETE_FAIL",
        payload:error.message
    });
  }
}


//comments

  //add comment
  export const saveCommentPost=(idPost,commentPost,token,email)=> async(dispatch)=>{
      
    try{
              dispatch({
                type:"COMMENT_POST_REQUEST"
              });
              
        const postComment={
          idPost:idPost,
          comment:commentPost,
          email:email
        }
        const response=await axios.post(`${SERVER}/comments/post`, 
                          postComment,{
                          headers:{
                              'Authorization':`Bearer ${token}`
                          }
                });        
         
              if(response.data.success){
                    dispatch({
                      type:"COMMENT_POST_SUCCESS", 
                      payload:response.data
                    });      
                }
            
    }catch(error){
        dispatch({
          type:"COMMENT_REQUEST_FAIL", 
          payload:error.message
        });
    }
}


//delete 
export const deleteCommentPost=(idComment,token)=> async(dispatch)=>{
      
  try{
            dispatch({
              type:"DELETE_COMMENTPOST_REQUEST"
            });
            
      const response=await axios.delete(`${SERVER}/comments/${idComment}`,{
                        headers:{
                            'Authorization':`Bearer ${token}`
                        }
              });        
       
            if(response.data.success){
                  dispatch({
                    type:"DELETE_COMMENTPOST_SUCCESS", 
                    payload:response.data
                  });      
              }
          
  }catch(error){
      dispatch({
        type:"COMMENT_DELETE_FAIL", 
        payload:error.message
      });
  }
}
