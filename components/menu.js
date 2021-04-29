import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {destroySession} from '../actions/authActions.js';

export const PrivateMenu =()=>{
	const dispatch=useDispatch();
	const statehandleSessionUser=useSelector(state=> state.handleSessionUser); 
	const {token,id,name,email}=statehandleSessionUser.user;
	
    return(
        <nav className="flex items-center justify-between flex-wrap bg-grey-darkest p-6 fixed w-full z-10 pin-t"
    style={{background:'black'}}>
		<div className="flex items-center flex-no-shrink text-white mr-6">
				<span className="text-2xl pl-2"><NavLink exact to={`/profile/${id}`}> {name}</NavLink></span>
		</div>

		<div className="block lg:hidden">
			<button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-grey border-grey-dark text-white hover:border-white"
            onClick={()=>{
                document.getElementById("nav-content").classList.toggle("hidden");
            }}>
				<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
			</button>
		</div>

		<div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
			<ul className="list-reset lg:flex justify-end flex-1 items-center">
				{(email==="admin@administrationred.com" && id===4)
					&& <li className="mr-3">
						<NavLink className="inline-block py-2 px-4 text-white no-underline" exact to="/users">Admin</NavLink>
					</li>
				}
				<li className="mr-3">
					<NavLink className="inline-block py-2 px-4 text-white no-underline" exact to="/feed">Inicio</NavLink>
				</li>
				<li className="mr-3">
					<a href="#" className="inline-block py-2 px-4 text-white no-underline" onClick={e=> {
												e.preventDefault();
												//Establecer en localstorage el valor (token) a la variable
												localStorage.setItem("auth-user-token", "");
												localStorage.setItem("auth-user-email", "");
												localStorage.setItem("auth-user-name", "");
												window.location.reload();
								} }>Cerrar Sesion
					</a>
				</li>
			</ul>
		</div>
	</nav>
    );
}

export const PublicMenu=()=>{
	return(
        <nav className="flex items-center justify-between flex-wrap bg-grey-darkest p-6  w-full z-10 pin-t"
    style={{background:'black'}}>
		
		<div className="block lg:hidden">
			<button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-grey border-grey-dark text-white hover:border-white"
            onClick={()=>{
                document.getElementById("nav-content").classList.toggle("hidden");
            }}>
				<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
			</button>
		</div>
		<div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
			<ul className="list-reset lg:flex justify-end flex-1 items-center">
				<li className="mr-3">
					<NavLink className="inline-block py-2 px-4 text-white no-underline" exact to="/">Registrarse</NavLink>
				</li>
				<li className="mr-3">
					<NavLink className="inline-block py-2 px-4 text-white no-underline" exact to="/login">Iniciar Sesion</NavLink>
				</li>
			</ul>
		</div>
	</nav>
    );
}