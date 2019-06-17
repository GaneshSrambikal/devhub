import axios from 'axios';
import {GET_PROFILE,SET_CURRENT_USER,PROFILE_LOADING,CLEAR_CURRENT_PROFILE, GET_ERRORS} from './types';

// get current profile
export const getCurrentProfile=()=> dispatch =>{
    dispatch(setProfileLoading());
    axios.get('/api/profile')
    .then(res =>{
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    })
    .catch(err => dispatch({
        type:GET_PROFILE,
        payload:{}
    }));
}
export const createProfile = (profileData, history) => dispatch => {
    axios
      .post('/api/profile', profileData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
//Profile Loding
export const setProfileLoading=()=>{
    return{
        type: PROFILE_LOADING
    }
}

// delete account and profile
export const deleteAccount=()=> dispatch =>{
    if(window.confirm('Are You Sure? This Can not be undone!')){
        axios
          .delete("/api/profile")
          .then(res => dispatch({
              type: SET_CURRENT_USER,
              payload:{}
          }))
          .catch(err => dispatch({
              type: GET_ERRORS,
              payload: err.Response.data
          }));
    }
}
//Clear Profile
export const clearCurrentProfile=()=>{
    return{
        type: CLEAR_CURRENT_PROFILE
    }
}
