import React,{useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'; //1. traer estado global, 2. ejecutar accion desde UI (interfaz de usuario)
import {listPosts,savePost,deletePost, saveCommentPost,deleteCommentPost} from '../actions/postActions.js';
import {Link} from 'react-router-dom';
import {Loader} from '../components/loader.js';
import {PATH_IMAGE_SERVER} from '../config/config.js';

const Feed=()=>{
    const dispatch=useDispatch();
    const stateListPosts=useSelector(state=> state.postsList); 
    const { loading,posts,success,error}=stateListPosts
    const statehandleSessionUser=useSelector(state=> state.handleSessionUser); 
    const {token,email,name}=statehandleSessionUser.user;
    const stateSavePost=useSelector(state=> state.savePost); 
    const { postSaveResponse,successSave,errorSave, LoadingSavePost}=stateSavePost;
    const stateDeletePost=useSelector(state=> state.deletePost); 
    const {postDeleteResponse,successDeletePost,loadingDeletePost,errorDeletePost}=stateDeletePost;
    const stateSaveCommentPost=useSelector(state=> state.saveCommentPost); 
    const {commentPostSaveResponse,successSaveCommentPost,errorSaveCommentPost,loadingComment}=stateSaveCommentPost;
    const stateDeleteCommentPost=useSelector(state=> state.deleteCommentPost); 
    const {commentDeleteSaveResponse,loadingDeleteComment}=stateDeleteCommentPost;

    const [post, setPost]=useState("");
    const [image,setImage]=useState(null);
    const [errorPost,setErrorPost]=useState([]);
    const ref = React.useRef(); //Clear input file

    useEffect(()=>{
        if(postSaveResponse && postSaveResponse.success){
            dispatch(listPosts(token));
        }
        if(postSaveResponse && postSaveResponse.error){
            setErrorPost([postSaveResponse.error]);
        }
        if(postDeleteResponse && postDeleteResponse.success){
            dispatch(listPosts(token));
        }
        if(commentPostSaveResponse && commentPostSaveResponse.success){
            dispatch(listPosts(token));
        }
        if(commentDeleteSaveResponse && commentDeleteSaveResponse.success){
            dispatch(listPosts(token));
        }
    },[postSaveResponse, postDeleteResponse, commentPostSaveResponse,commentDeleteSaveResponse]);

    useEffect(()=>{
        dispatch(listPosts(token));
    },[]);

    const savingPost=(e)=>{
        e.preventDefault();
        
        let endpoint="post";
        let postData=new FormData();
        postData.append("post", post);
        postData.append("email",email);
        postData.append("image",image);
        
        if(image && post){
            postData.append("image",image);
            endpoint="post-image";
        }
        if(image && !post){
            postData.append("image",image);
            endpoint="image";
        }
        dispatch(savePost(postData,token,endpoint));
        
        ref.current.value = ""
        setPost("");
        setImage(null);
    }

    const dropPost=(id,isImage)=>{
        let image=(isImage) ? true:false;
        dispatch(deletePost(id, token,image));
    }

    const postComment=(idPost)=>{
        let commentInPost=document.getElementById(idPost).value;
        if(commentInPost.length >0){
            dispatch(saveCommentPost(idPost,commentInPost,token,email));   
            document.getElementById(idPost).value="";
        }
    }

    const deleteComment=(idComment)=>{
        dispatch(deleteCommentPost(idComment,token));
    }
    
            return(
                <div className="w-full bg-indigo-100 h-screen flex flex-row flex-wrap justify-center ">
                        <div style={{marginTop:'5em'}} className="profile-bar">
                                        <div className=" antialiased flex flex-col hover:cursor-pointer">
                                            <p className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold">Mensajes</p>
                                            <p className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold">Grupos</p>
                                            <p className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold">Invitaciones</p>
                                            <Link to="/search-profiles" className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold">Buscar Amigos</Link>
                                        </div>
                        </div>    
                        
                        <div className="w-0 md:w-1/4 lg:w-1/5 h-0 md:h-screen overflow-y-hidden bg-white shadow-lg"
                            id="div-in-responsive"
                            style={{marginTop:'5em'}}>
                        
                                <div className="w-full h-screen antialiased flex flex-col hover:cursor-pointer">
                                    <p className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold"><i className="fa fa-comment text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Mensajes</p>
                                    <p className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold"><i className="fa fa-cog text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Grupos</p>
                                    <p className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold"><i className="fa fa-arrow-left text-gray-600 text-2xl pr-1 pt-1 float-right"></i>Invitaciones</p>
                                    <Link to="/search-profiles" className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold">Buscar Amigos</Link>
                                </div>
                        </div>

                        <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full antialiased">

                                <div className="bg-white w-full shadow rounded-lg p-5"
                                style={{marginTop:'5em'}}>
                                        {(errorPost && errorPost.length>0) && <p>Errror</p>}
                                        <form onSubmit={savingPost} >
                                            <textarea className="bg-gray-200 w-full rounded-lg shadow border p-2" rows="5" placeholder="Que piensas?"
                                            value={post}
                                            onChange={e=>setPost(e.target.value)}></textarea>
                                            <div className="w-full flex flex-row flex-wrap mt-3">
                                                    <div className="w-1/3">
                                                            <input type="file"
                                                                ref={ref}
                                                                onChange={e=>setImage(e.target.files[0])}/>
                                                    </div>
                                                    <div className="w-2/3">
                                                        <input type="submit" className="float-right bg-indigo-400  text-white p-2 rounded-lg" value="Publicar"
                                                            disabled={(!post && image ===null) ?true:false}
                                                            />
                                                    </div>
                                            </div>
                                        </form>
                                </div>    
                                <div className="mt-3 flex flex-col">
                                            {
                                                (loadingDeletePost || loadingDeleteComment || LoadingSavePost)
                                                && <Loader />
                                            }
                                            {(success && posts.message) 
                                                && <p>No hay posts disponibles</p>
                                            }
                                            {(loading) 
                                                && <p>Cargando......</p>
                                            }
                                            {   (success && posts) 
                                                && posts.map((p,i)=>{
                                                    return(
                                                        <div className="bg-white mt-3" style={{marginBottom:'5%'}} key={i}>
                                                            <div className="top-post">
                                                                <p className="username"><Link to={`/profile/${p.user.id}`}>@{p.user.name}</Link></p>
                                                                {
                                                                    (p.user.email === email)
                                                                        && <button onClick={()=>{
                                                                            dropPost(p.id, p.image);
                                                                        }}>X</button>
                                                                }
                                                            </div>
                                                            {
                                                                (p.image) 
                                                                &&  <img className="border rounded-t-lg shadow-lg  image-post" 
                                                                src={`${PATH_IMAGE_SERVER}/posts/${p.user.email}/${p.image.url}`} alt="image-post"/>
                                                            }
                                                            <div className="bg-white border shadow p-5 text-xl text-gray-700 font-semibold">
                                                                {
                                                                    (p.post)
                                                                    && <p>{p.post}</p>
                                                                }
                                                            </div>
                                                            <div className="bg-white p-1 border shadow flex flex-row flex-wrap">
                                                                <div className="w-1/3 hover:bg-gray-200 text-center text-xl text-gray-700 font-semibold">Like</div>
                                                                <div className="w-1/3 hover:bg-gray-200 border-l-4 border-r- text-center text-xl text-gray-700 font-semibold">Share</div>
                                                            </div>
                                                    
                                                            <div className="bg-white border-4 bg-gray-300 border-white rounded-b-lg shadow p-5 text-xl text-gray-700 content-center font-semibold flex flex-row flex-wrap">
                                                                <div className="w-full comment-div">
                                                                {
                                                                    (p.comments.length>0)
                                                                        && p.comments.map((c,i)=>{
                                                                            return(
                                                                                    <div className="w-full text-left text-xl text-gray-600 comment-post" key={i}>
                                                                                    {
                                                                                        (c.user_email === email)
                                                                                        && <button onClick={()=>deleteComment(c.id)}>X</button>
                                                                                    }
                                                                                    <h2><Link to={`/profile/${c.user_id}`}>@{c.username}</Link></h2>
                                                                                    <p>{c.comment}</p>
                                                                                    </div>
                                                                            )
                                                                        })
                                                                }
                                                                
                                                                </div>
                                                                <textarea placeholder="comentar" className="post-comment" 
                                                                    id={p.id}></textarea>
                                                                <button className="btn-comment-post" onClick={
                                                                        ()=>postComment(p.id)
                                                                }>{(loadingComment) ? 'Cargando...': 'Comentar'}</button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            
                                </div>

                            </div>

                </div>
            );
    //}

    //return(null);
}
export default Feed;