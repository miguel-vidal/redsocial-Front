import './styles.css';
import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {Routes} from './components/routes.js';
import {SERVER} from './config/config.js';
import {handleUserSession, setLoader} from './actions/authActions.js';


function App(){
      
    const dispatch=useDispatch();

    useEffect(()=>{
        //Cada llamada con axios debe tener un axync y await
        const checkLoggedIn=async()=>{

            let token=localStorage.getItem("auth-user-token");
            if(!token){
                localStorage.setItem("auth-user-token","");
                token="";
                dispatch(setLoader()); //checar si el user esta autenticado     
                return;
            }
              try{
                //retorna el usuario autenticado
                const tokenRes=await axios.get(`${SERVER}/users/auth`,
                            {
                                headers:{
                                    "Authorization":`Bearer ${token}`
                                },
                            })
                            
                //Si el token existe nos trae un objeto user:{}
                if(tokenRes.data){
                        //ejecuta el metodo en  /authAction.js
                        //solo guarda el name, token y el email del user
                        dispatch(handleUserSession(
                            token,
                            tokenRes.data.email,
                            tokenRes.data.id,
                            tokenRes.data.name,
                            ));
                        dispatch(setLoader()); //checar si el user esta autenticado     
                    }
                }catch(error){
                    console.log(`token is not valid ! : ${error}`);
                    //cambiar a true para que deje de cargar el loader global y muestre el menu
                   dispatch(setLoader());
                }
        }

        checkLoggedIn();
    },[]);

      return(
              <Router>
                <Routes />
              </Router>
      );
}

export default App;
