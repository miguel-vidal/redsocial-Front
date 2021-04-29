import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'; //1. traer estado global, 2. ejecutar accion desde UI (interfaz de usuario)
import {getProfile} from '../actions/UserActions.js'
import {listPosts,listPostsByProfile,deletePost, saveCommentPost,deleteCommentPost} from '../actions/postActions.js';
import {Link} from 'react-router-dom';
import {Loader} from '../components/loader.js';
import {PATH_IMAGE_SERVER} from '../config/config.js';

export const ProfileUser=(props)=>{
    const dispatch=useDispatch();
    const stateListPostsProfile=useSelector(state=> state.postsProfileList); 
    const { loadingPostsProfile,postsProfile,successPostsProfile,errorPostsProfile}=stateListPostsProfile
    const statehandleSessionUser=useSelector(state=> state.handleSessionUser); 
    const {token,email,name}=statehandleSessionUser.user;
    const stateDeletePost=useSelector(state=> state.deletePost); 
    const {postDeleteResponse,successDeletePost,loadingDeletePost,errorDeletePost}=stateDeletePost;
    const stateSaveCommentPost=useSelector(state=> state.saveCommentPost); 
    const {commentPostSaveResponse,successSaveCommentPost,errorSaveCommentPost,loadingComment}=stateSaveCommentPost;
    const stateDeleteCommentPost=useSelector(state=> state.deleteCommentPost); 
    const {commentDeleteSaveResponse}=stateDeleteCommentPost;

    const [errorPost,setErrorPost]=useState([]);
    const [commentPost, setCommentPost]=useState("");

    useEffect(()=>{
        if(postDeleteResponse && postDeleteResponse.success){
            dispatch(listPostsByProfile(props.idUser,token));
        }
        if(commentPostSaveResponse && commentPostSaveResponse.success){
            dispatch(listPostsByProfile(props.idUser,token));
        }
        if(commentDeleteSaveResponse && commentDeleteSaveResponse.success){
            dispatch(listPostsByProfile(props.idUser,token));
        }
    },[ postDeleteResponse, commentPostSaveResponse,commentDeleteSaveResponse]);

    useEffect(()=>{
        dispatch(listPostsByProfile(props.idUser,token));
    },[]);

    const dropPost=(id,isImage)=>{
        let image=(isImage) ? true:false;
        dispatch(deletePost(id, token,image));
    }

    const postComment=(idPost)=>{

        dispatch(saveCommentPost(idPost,commentPost,token,email));
        setCommentPost("");
    }

    const deleteComment=(idComment)=>{
        dispatch(deleteCommentPost(idComment,token));
    }
    
    return(
            <div className="w-full md:w-3/4 lg:w-4/5 p-5 md:px-12 lg:24 h-full antialiased">
                     <div className="mt-3 flex flex-col">
                            {
                                (loadingDeletePost)
                                && <Loader />
                            }
                            {(successPostsProfile && postsProfile.message) 
                                && <p>No hay posts disponibles</p>
                            }
                            {(loadingPostsProfile) 
                                && <p>Cargando......</p>
                            }
                            {   (successPostsProfile && !postsProfile.message) 
                                && postsProfile.map((p,i)=>{
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
                                                src={`${PATH_IMAGE_SERVER}/posts/${p.user.email}/${p.image.url}`} />
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
                                                                        &&  <button onClick={()=>deleteComment(c.id)}>X</button>
                                                                    }
                                                                    <h2><Link to={`/profile/${c.user_id}`}>@{c.username}</Link></h2>
                                                                    <p>{c.comment}</p>
                                                                    </div>
                                                            )
                                                        })
                                                }
                                                
                                                </div>
                                                <textarea placeholder="comentar" className="post-comment" 
                                                    value={commentPost}
                                                    onChange={e=>setCommentPost(e.target.value)}
                                                ></textarea>
                                                <button className="btn-comment-post" onClick={
                                                        ()=>postComment(p.id)
                                                }
                                                disabled={(!commentPost) ? true:false}
                                                >comentar</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                </div>
   
            </div>
    );
}