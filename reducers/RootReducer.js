import {combineReducers} from "redux";
import {signInReducer,handleSession,setLoader,signUpReducer} from "./authReducers.js";
import {postListReducer,savePostReducer,deletePostReducer,saveCommentPostReducer,deleteCommentPostReducer,postProfileListReducer} from './postReducers.js';
import {getProfileReducer,saveProfileReducer,updateProfileReducer,getProfilesReducer,getUsersReducer,deleteUserReducer} from './userReducers.js';

const RootReducer = combineReducers({
  authUser:signInReducer,
  register:signUpReducer,
  handleSessionUser:handleSession,
  loader:setLoader,
  postsList:postListReducer,
  postsProfileList:postProfileListReducer,
  savePost:savePostReducer,
  deletePost:deletePostReducer,
  saveCommentPost:saveCommentPostReducer,
  deleteCommentPost:deleteCommentPostReducer,
  getProfile:getProfileReducer,
  getProfiles:getProfilesReducer,
  saveProfile:saveProfileReducer,
  updateProfile:updateProfileReducer,
  getUsers:getUsersReducer,
  deleteUser:deleteUserReducer
});

export default RootReducer;