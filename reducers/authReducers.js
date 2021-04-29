
//state para hacer login
    export const signInReducer=(state={
            LoginUserResponse:[],
            loadingLogin:false,
            successLogin:false
        }, action)=>{
        
        switch(action.type){
            case "AUTH_REQUEST":
                return {
                    ...state,
                    LoginUserResponse:action.payload,
                    loadingLogin:true
                }
            
            case "VALIDATION_ERROR":
                    return {
                        LoginUserResponse:action.payload,
                        loadingLogin:false,
                        successLogin:false
                    }
    
            case "AUTH_SUCCESS":
                return{
                    LoginUserResponse:action.payload,
                    loadingLogin:false,
                    successLogin:true
                }
            
            case "AUTH_FAIL":
                return {
                    error:action.payload,
                    loadingLogin:false,
                    successLogin:false
                }

            case "RESET_SIGNIN_STATE":
                return {
                    LoginUserResponse:[],
                    loadingLogin:false,
                    successLogin:false,
                    statusCode:''
                }

                default: return state;
        }
        
    }

    export const signUpReducer=(state={
        newUserRegister:[],
        loadingRegister:false,
        successRegister:false
    }, action)=>{
        
        switch(action.type){
            
                case "REGISTER_USER_REQUEST":
                    return {
                        ...state,
                        newUserRegister:action.payload,
                        loadingRegister:true
                    }

                case "REGISTER_USER_SUCCESS":
                    return {
                        newUserRegister:action.payload,
                        loadingRegister:false,
                        successRegister:true
                    }

                case "VALIDATION_SIGNUP_ERROR":
                    return{
                        newUserRegister:action.payload,
                        loadingRegister:false,
                        successRegister:false
                    }

                case "REGISTER_USER_FAIL":
                    return {
                        error:action.payload,
                        loadingRegister:false,
                        successRegister:false
                    }
                case "CLEAN_STATE_REGISTER":
                    return{
                        newUserRegister:[],
                        loadingRegister:false,
                        successRegister:false
                    }

                default: return state;
        }
    }

    export const handleSession=(state={
        user:{
            id:'',
            token:'',
            email:'',
            name:''
        }
    },action)=>{

        switch(action.type){
            case "SAVE_SESSION_USER":
                const {token_user, email_user,id_user, name_user} =action.payload;
                //de payload tenemos variables y las ponemos en mi estado
                return {
                        user:{
                            token:token_user,
                            email:email_user,
                            id:id_user,
                            name:name_user
                        }
                }

            case "DESTROY_SESSION_USER":
                return {
                    user:{
                        id:'',
                        token:'',
                        name:'',
                        email:''
                    }           
                }
            
            default: return state;
        }
    }

    //no checa si hay usuario autenticado, solo es para hacer tiempo con un loader global 
    //para ver si hay token o no hay
    export const setLoader=(state={
        isLoaderActive:true
    },action)=>{

        switch(action.type){
            case "SET_LOADER":
                //de payload tenemos variables y las ponemos en mi estado
                return {
                    isLoaderActive:!state.isLoaderActive
                }

            default: return state;
        }
    }

    