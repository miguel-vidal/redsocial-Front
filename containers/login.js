import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'; //1. traer estado global, 2. ejecutar accion desde UI (interfaz de usuario)
import {signIn,handleUserSession} from '../actions/authActions.js'; //desde la interfaz se ejecuta esta action
import {Loader} from '../components/loader.js';


const Login=()=>{
    const dispatch=useDispatch();
    const stateLoginUser=useSelector(state=> state.authUser); //authLoginUser pertenece a metodo signInUser de /authReducers.js
    const {LoginUserResponse, loadingLogin, successLogin, error} =stateLoginUser;
    const history=useHistory();
    const [userLogin, setUserLogin]=useState({
        email:'',
        password:''
    });
    const [errorValidation, setErrorValidation]=useState([]);


    useEffect(()=>{
    
        //si ya hay data del response gracias al metodo dispatch(signIN())
        if(successLogin && (LoginUserResponse.token !=="")){
            
            let token=LoginUserResponse.token;
            let email=LoginUserResponse.email;
            let name=LoginUserResponse.name;
            let id=LoginUserResponse.id;

            //Establecer en localstorage el valor (token) a la variable
            localStorage.setItem("auth-user-token", token);
            localStorage.setItem("auth-user-email", email);
            localStorage.setItem("auth-user-name", name);

            //metodo que esta en /authAction.js
            dispatch(handleUserSession(token, email,id,name));
            history.push(`profile/${id}`);
            
        }
        if(LoginUserResponse && LoginUserResponse.error){          
            let errorArray=[];
            for(let i in LoginUserResponse.error){
                errorArray.push(LoginUserResponse.error[i]);
            }
            //flat() hacer el array plano [1, [2,[3]]4] => [1,23,4]
            setErrorValidation(errorArray.flat());
            dispatch({type:"RESET_SIGNIN_STATE"});  
        }
        if(!successLogin && error){
            setErrorValidation([error]);
            dispatch({type:"RESET_SIGNIN_STATE"});
        }
    }, [successLogin, LoginUserResponse,error]);


    const signInUser=(e)=>{
        e.preventDefault();
        if(!(userLogin.email.length >= 1)){
            alert("Por Favor Introduzca un correo valido, debe contener @ y maximo 6 caracteres");
            setUserLogin(({...userLogin, email:''}));
            return;
        }
        if(!(userLogin.password.length >= 1)){
            alert("Muy corta su contraseña");
            setUserLogin(({...userLogin, password:''}));
            return;
        }

        dispatch(signIn(userLogin));
        setErrorValidation([]); //limpiar array de errores
    }

    return(
        <div>
            {(loadingLogin) && <Loader />}
            <h2 className="title">Iniciar Sesion</h2>
            <div className="error-validation">
            {(error) && <p style={{color:'red'}}>{error}</p>}
            {(errorValidation.length >0) 
                && errorValidation.map((err,i)=>{
                    return(  
                        <p  key={i} style={{color:'red'}}>{err}</p> 
                    )
                })
                }
            </div>
            <form className="form-style" onSubmit={signInUser}>
                <div>
                    <label className="block mb-2 text-indigo-500" htmlFor="email">Email</label>
                    <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" name="email"
                    value={userLogin.email} 
                    onChange={e => setUserLogin({...userLogin, [e.target.name]: e.target.value}) } 
                    />
                </div>
                <div>
                    <label className="block mb-2 text-indigo-500" htmlFor="password">Password</label>
                    <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" name="password"
                    value={userLogin.password} 
                    onChange={e => setUserLogin({...userLogin, [e.target.name]: e.target.value}) } 
                    />
                </div>
                <div>          
                    <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit" value="Entrar"/>
                </div>       
            </form>
        </div>
    );
}

export default Login;