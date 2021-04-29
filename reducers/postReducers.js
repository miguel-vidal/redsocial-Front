//establezco estado sera un array
export const postListReducer=(state={
    loading:false,
    posts:[],
    success:false,
    error:[]
}, action)=>{
    
    //dependiendo el type "" usare lo que contenga su payload
    switch(action.type){
        case "POSTS_LIST_REQUEST":
            return {loading:true,
                    success:false
                }

        case "POSTS_LIST_SUCCESS":
            //books es del state, guardo lo del payload en actions
            return { loading:false, posts:action.payload, success:true}

        case "POST_REQUEST_FAIL":
            return {
                loading:false,
                posts:[],
                success:false,
                error:action.payload
            }

        default:
            //importante siempre devolver en default el estado inicial, por si no se ha hecho ninguna operacion
            return state
    }
}


export const postProfileListReducer=(state={
    loadingPostsProfile:false,
    postsProfile:[],
    successPostsProfile:false,
    errorPostsProfile:[]
}, action)=>{
    
    //dependiendo el type "" usare lo que contenga su payload
    switch(action.type){
        case "POSTS_PROFILE_LIST_REQUEST":
            return {loadingPostsProfile:true,
                    successPostsProfile:false
                }

        case "POSTS_PROFILE_LIST_SUCCESS":
            //books es del state, guardo lo del payload en actions
            return { loadingPostsProfile:false, postsProfile:action.payload, successPostsProfile:true}

        case "POSTS_PROFILE_LIST_FAIL":
            return {
                loadingPostsProfile:false,
                postsProfile:[],
                successPostsProfile:false,
                errorPostsProfile:action.payload
            }

        default:
            //importante siempre devolver en default el estado inicial, por si no se ha hecho ninguna operacion
            return state
    }
}



export const savePostReducer=(state={
    postSaveResponse:[],
    successSave:false,
    errorSave:[],
    LoadingSavePost:false
    }, 
    action)=>{
        
    switch(action.type){

        case "PUBLICATION_POST_REQUEST":
            return {
                postSaveResponse:[],
                successSave:false,
                errorSave:[],
                LoadingSavePost:true
            }
            
        case "PUBLICATION_POST_SUCCESS":
            return {
                 postSaveResponse:action.payload,
                 successSave:true,
                 LoadingSavePost:false
            }

        case "CATEGORY_POST_FAIL":
            return {
                error:[action.payload],
                successSave:false,
                LoadingSavePost:false
            }

        
        default:
            return state;
    }
  }

  
  export const deletePostReducer=(state={
    postDeleteResponse:[], 
    successDeletePost:false,
    loadingDeletePost:false,
    errorDeletePost:[]
    }, 
    action)=>{
        
    switch(action.type){

        case "POST_DELETE_REQUEST":
            return {...state,
                 errorDeletePost:[],
                 successDeletePost:false,
                 loadingDeletePost:true}
            
        case "POST_DELETE_SUCCESS":
            return {
                 postDeleteResponse:action.payload,
                 successDeletePost:true,
                 loadingDeletePost:false,
                 errorDeletePost:[]
            }

        case "POST_DELETE_FAIL":
            return {
                errorDeletePost:[action.payload],
                successDeletePost:false,
                loadingDeletePost:false
            }
        default:
            return state;
    }
  }


//comments

export const saveCommentPostReducer=(state={
    commentPostSaveResponse:[],
    successSaveCommentPost:false,
    errorSaveCommentPost:[],
    loadingComment:false
    }, 
    action)=>{
        
    switch(action.type){
        
        case "COMMENT_POST_REQUEST":
            return {
                successSaveCommentPost:false,
                errorSaveCommentPost:[],
                loadingComment:true
            }

        case "COMMENT_POST_SUCCESS":
            return {
                 commentPostSaveResponse:action.payload,
                 successSaveCommentPost:true,
                 errorSaveCommentPost:[],
                loadingComment:false
            }

        case "COMMENT_REQUEST_FAIL":
            return {
                errorSaveCommentPost:[action.payload],
                successSaveCommentPost:false,
                loadingComment:false
            }

        
        default:
            return state;
    }
  }


  export const deleteCommentPostReducer=(state={
    commentDeleteSaveResponse:[],
    successDeleteCommentPost:false,
    errorDeleteCommentPost:[],
    loadingDeleteComment:false
    }, 
    action)=>{
        
    switch(action.type){
        
        case "DELETE_COMMENTPOST_REQUEST":
            return {
                successDeleteCommentPost:false,
                errorDeleteCommentPost:[],
                loadingDeleteComment:true
            }

        case "DELETE_COMMENTPOST_SUCCESS":
            return {
                 commentDeleteSaveResponse:action.payload,
                 successDeleteCommentPost:true,
                 errorDeleteCommentPost:[],
                loadingDeleteComment:false
            }

        case "COMMENT_DELETE_FAIL":
            return {
                errorDeleteCommentPost:[action.payload],
                succesDeletesDeleteCommentPost:false,
                loadingComment:false
            }

        
        default:
            return state;
    }
  }
