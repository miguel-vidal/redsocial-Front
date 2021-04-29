import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'; //1. traer estado global, 2. ejecutar accion desde UI (interfaz de usuario)
import {signUp} from '../actions/authActions.js'; //desde la interfaz se ejecuta esta action
import {Loader} from '../components/loader.js';

const Register=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const stateRegister=useSelector(state=> state.register);
    const {newUserRegister,loadingRegister,error} =stateRegister;
    const [userRegister, setUserRegister]=useState({
        username:'',
        email:'',
        password:''
    });
    const [errorValidation, setErrorValidation]=useState([]);

    useEffect(()=>{
        if(newUserRegister &&  newUserRegister.success){
            history.push('/login');
        }
        if(newUserRegister && newUserRegister.error){
            let errorArray=[];
            for(let i in newUserRegister.error){
                errorArray.push(newUserRegister.error[i]);
            }
            //flat() hacer el array plano [1, [2,[3]]4] => [1,23,4]
            setErrorValidation(errorArray.flat());
        }
    },[newUserRegister]);

    const registerUser=(e)=>{
        e.preventDefault();
        dispatch(signUp(userRegister));
        setUserRegister({
            username:'',
            email:'',
            password:''
        });
    }

    return(
        <div>
            {(loadingRegister) && <Loader />}
            
            <h2 className="title">Red Social</h2>
            <div className="error-validation">
                {(error) && <p style={{color:'red'}}>{error}</p>}
                {
                    (errorValidation.length >0) 
                    && errorValidation.map((err,i)=>{
                        return(  
                            <p  key={i} style={{color:'red'}}>{err}</p> 
                        )
                    })
                }
            </div>
            <form className="form-style" onSubmit={registerUser}>
                <div>
                    <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" name="username"
                    placeholder="nombre de usuario"
                    value={userRegister.username} 
                    onChange={e => setUserRegister({...userRegister, username: e.target.value}) } 
                    />
                </div>
                <div>
                    <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="email" name="email"
                    placeholder="Correo electronico: **Puede ser ficticio"
                    value={userRegister.email} 
                    onChange={e => setUserRegister({...userRegister, email: e.target.value}) } 
                    />
                </div>
                <div>
                    <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" name="password"
                    placeholder="Contraseña"
                    value={userRegister.password} 
                    onChange={e => setUserRegister({...userRegister, password: e.target.value}) } 
                    />
                </div>
                <div>          
                    <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit"
                    value="Registrarte"/>
                </div>       
            </form>
        </div>
    );
}

export default Register;