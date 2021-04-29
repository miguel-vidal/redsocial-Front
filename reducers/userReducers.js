
//reducer para admin
export const getUsersReducer=(state={
    loadingUsers:false,
    users:[],
    successUsers:false,
    errorUsers:[]
  }, action)=>{
    
    //dependiendo el type "" usare lo que contenga su payload
    switch(action.type){
        case "GET_ALL_USERS_REQUEST":
            return {loadingUsers:true,
                    successUsers:false
                }
  
        case "GET_ALL_USERS_SUCCESS":
            //books es del state, guardo lo del payload en actions
            return {
               loadingUsers:false, users:action.payload, successUsers:true}
  
        case "GET_ALL_USERS_FAIL":
            return {
                loadingUsers:false,
                users:[],
                successUsers:false,
                errorUsers:action.payload
            }
  
        default:
            //importante siempre devolver en default el estado inicial, por si no se ha hecho ninguna operacion
            return state
    }
  }

  //reducer para admin
export const deleteUserReducer=(state={
    loadingDeleteUsers:false,
    userDelete:[],
    successDeleteUsers:false,
    errorDeleteUsers:[]
  }, action)=>{
    
    //dependiendo el type "" usare lo que contenga su payload
    switch(action.type){
        case "DELETE_USER_REQUEST":
            return {loadingDeleteUsers:true,
                    successDeleteUsers:false
                }
  
        case "DELETE_USER_SUCCESS":
            //books es del state, guardo lo del payload en actions
            return {
               loadingDeleteUsers:false, userDelete:action.payload, successDeleteUsers:true}
  
        case "DELETE_USER_FAIL":
            return {
                loadingDeleteUsers:false,
                userDelete:[],
                successUsers:false,
                errorDeleteUsers:action.payload
            }
  
        default:
            //importante siempre devolver en default el estado inicial, por si no se ha hecho ninguna operacion
            return state
    }
  }
  
  

export const getProfilesReducer=(state={
  loadingProfiles:false,
  profiles:[],
  successProfiles:false,
  errorProfiles:[]
}, action)=>{
  
  //dependiendo el type "" usare lo que contenga su payload
  switch(action.type){
      case "GET_PROFILES_REQUEST":
          return {loadingProfiles:true,
                  successProfiles:false
              }

      case "GET_PROFILES_SUCCESS":
          //books es del state, guardo lo del payload en actions
          return {
             loadingProfiles:false, profiles:action.payload, successProfiles:true}

      case "GET_PROFILES_FAIL":
          return {
              loadingProfiles:false,
              profiles:[],
              successProfiles:false,
              errorProfiles:action.payload
          }

      default:
          //importante siempre devolver en default el estado inicial, por si no se ha hecho ninguna operacion
          return state
  }
}


export const getProfileReducer=(state={
  loadingProfile:false,
  profile:[],
  successProfile:false,
  errorProfile:[]
}, action)=>{
  
  //dependiendo el type "" usare lo que contenga su payload
  switch(action.type){
      case "GET_USER_REQUEST":
          return {loadingProfile:true,
                  successProfile:false
              }

      case "GET_USER_SUCCESS":
          //books es del state, guardo lo del payload en actions
          return {
             loadingProfile:false, profile:action.payload, successProfile:true}

      case "GET_USER_FAIL":
          return {
              loadingProfile:false,
              profile:[],
              successProfile:false,
              errorProfile:action.payload
          }

      default:
          //importante siempre devolver en default el estado inicial, por si no se ha hecho ninguna operacion
          return state
  }
}

export const saveProfileReducer=(state={
  loadingSaveProfile:false,
  saveProfile:[],
  successSaveProfile:false,
  errorSaveProfile:[]
}, action)=>{
  
  //dependiendo el type "" usare lo que contenga su payload
  switch(action.type){
      case "POST_PROFILE_REQUEST":
          return {loadingSaveProfile:true,
                  successSaveProfile:false
              }

      case "POST_PROFILE_SUCCESS":
          //books es del state, guardo lo del payload en actions
          return {
             loadingSaveProfile:false, saveProfile:action.payload, successSaveProfile:true}

      case "POST_PROFILE_ERROR":
          return {
              loadingSaveProfile:false,
              saveProfile:[],
              successSaveProfile:false,
              errorSaveProfile:action.payload
          }

      default:
          //importante siempre devolver en default el estado inicial, por si no se ha hecho ninguna operacion
          return state
  }
}


export const updateProfileReducer=(state={
    loadingUpdateProfile:false,
    updateProfile:[],
    successUpdateProfile:false,
    errorUpdateProfile:[]
  }, action)=>{
    
    //dependiendo el type "" usare lo que contenga su payload
    switch(action.type){
        case "UPDATE_PROFILE_REQUEST":
            return {loadingUpdateProfile:true,
                    successUpdateProfile:false
                }
  
        case "UPDATE_PROFILE_SUCCESS":
            //books es del state, guardo lo del payload en actions
            return {
               loadingUpdateProfile:false, updateProfile:action.payload, successUpdateProfile:true}
  
        case "UPDATE_PROFILE_ERROR":
            return {
                loadingUpdateProfile:false,
                updateProfile:[],
                successUpdateProfile:false,
                errorUpdateProfile:action.payload
            }
  
        default:
            //importante siempre devolver en default el estado inicial, por si no se ha hecho ninguna operacion
            return state
    }
  }
  
  
  
  
