import React,{useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'; //1. traer estado global, 2. ejecutar accion desde UI (interfaz de usuario)
import {saveProfileAction, updateProfileAction} from '../actions/UserActions.js'
import {Loader} from '../components/loader.js';
import {PATH_IMAGE_SERVER} from '../config/config.js';
import img from'../assets/none.jpg';

const UpdateProfile=(props)=>{
    const dispatch=useDispatch();
    const stateSaveProfile=useSelector(state=> state.saveProfile); 
    const { loadingSaveProfile,saveProfile,errorSaveProfile}=stateSaveProfile
    const stateUpdateProfile=useSelector(state=> state.updateProfile); 
    const { loadingUpdateProfile,updateProfile,errorUpdateProfile}=stateUpdateProfile
    const stateGetProfile=useSelector(state=> state.getProfile); 
    const { profile}=stateGetProfile
    const [age, setAge]=useState("");
    const [desc, setDesc]=useState("");
    const [image,setImage]=useState(null);
    const ref = React.useRef(); //Clear input file
    const [errorValidation, setErrorValidation]=useState([]);

    useEffect(()=>{
        if(saveProfile && saveProfile.success){
            window.location.reload();
        }
        if(saveProfile && saveProfile.error_validation){
            let errorArray=[];
            for(let i in saveProfile.error_validation){
                errorArray.push(saveProfile.error_validation[i]);
            }
            setErrorValidation(errorArray.flat());
        }
        if(updateProfile && updateProfile.success){
            window.location.reload();
        }
        if(updateProfile && updateProfile.error_validation){
            let errorArray=[];
            for(let i in updateProfile.error_validation){
                errorArray.push(updateProfile.error_validation[i]);
            }
            setErrorValidation(errorArray.flat());
        }
        if(!props.saveProfile){
            setAge(profile.profile.age);
            setDesc(profile.profile.description);
        }
    },[saveProfile, updateProfile]);

    const saveFormProfile=(e)=>{
        e.preventDefault();
        let postData=new FormData();
        
        postData.append("age", age);
        postData.append("description", desc);
        postData.append("email",props.email);

        if(image){
            postData.append("image",image);
        }

        if(props.saveProfile){
            dispatch(saveProfileAction(postData,props.token));   
        }else{
            postData.append("id",`${profile.profile.id}`);  //id del profile, no del user
            postData.append("_method","PUT");
            dispatch(updateProfileAction(postData,props.token));   
        }
        
        ref.current.value = ""
        setAge("");
        setDesc("");
        setImage(null);
        
    }

    return(
        <div style={{paddingTop:'5em'}}>
            {console.log(stateGetProfile)}
            {(loadingSaveProfile || loadingUpdateProfile) && <Loader />}
            <h2 className="title">{(props.saveProfile) ? 'Crear Perfil' : 'Actualizar perfil'}</h2>
            <div className="error-validation">
            {((errorSaveProfile && errorSaveProfile.length>0)|| (errorUpdateProfile && errorUpdateProfile.length >0)) && <p style={{color:'red'}}>error de servidor</p>}
            {(errorValidation.length >0) 
                && errorValidation.map((err,i)=>{
                    return(
                      <p key={i}  style={{color:'red'}}>{err}</p> 
                    )
                })
            }
            </div>
            <form className="form-style " onSubmit={saveFormProfile}>
                <div>
                    <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="number" name="age"
                    value={age}
                    onChange={e=>setAge(e.target.value)}
                    placeholder="Edad"/>
                </div>
                <div>
                    <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" 
                    value={desc}
                    onChange={e=>setDesc(e.target.value)}
                    placeholder="Descripcion sobre ti"/>
                </div>
                <div>
                    {
                        (!props.saveProfile)
                        &&  <img style={{width:'50px', height:'50px', border:'1px solid black'}} src={(profile.profile.photo) 
                            ? `${PATH_IMAGE_SERVER}/profiles/${props.email}/${profile.profile.photo}`  
                            : img} alt="profile-img" />
                    }
                <label className="block mb-2 text-indigo-500" htmlFor="image">Imagen de Perfil</label>
                <input name="image" style={{marginBottom:'2%'}} type="file" ref={ref} onChange={e=>setImage(e.target.files[0])}/>
                </div>
                <div>          
                    <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit"
                    disabled={(!image && !age && !desc)}
                    value={(props.saveProfile) ? "Guardar":"Actualizar"}/>
                </div>       
            </form>
        </div>
    );
}

export default UpdateProfile;