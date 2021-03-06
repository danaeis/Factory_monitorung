import axios from 'axios';
import { Redirect } from 'react-router-dom';
//import xtype from 'xtypejs';

export const getApi = () =>{
  return 'http://127.0.0.1:8000';
}


// let time;

// let startDateTime = new Date('December 21, 2019 03:24:00');



// set the token and user from the session storage
export const setUserSession = (token) => {
  localStorage.setItem('token', token);
  // localStorage.setItem('refresh', refresh);
  localStorage.setItem('loginStart', Date());
  localStorage.setItem('refreshStart', Date());
  localStorage.setItem('loggedIn',true);
}

export const getUser=()=>{
  //if(sessionStorage.getItem('loggedIn')===true) sessionStorage.setItem('loggedIn',false);
  return localStorage.getItem('loggedIn')||false;
}
// return the token from the session storage
export const getToken = () => {
  const url=getApi();
  const currentDateTime = new Date();
  const startDateTime = new Date(localStorage.getItem('loginStart'));
  const lastRefreshDateTime = new Date(localStorage.getItem('refreshStart'));
  //console.log("now: " + currentDateTime + " passed from " + lastRefreshDateTime + " : " + Math.round((currentDateTime - lastRefreshDateTime)/(1000*60)));
  
  // (1000*60*60*24)) >= 7)
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //  else{
  //   console.log("access allowed");
  //  }
  return localStorage.getItem('token') || null;
}

// // remove the token and user from the session storage
export const removeUserSession = () => {
  //console.log("logout");
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('token');
  // localStorage.removeItem('refresh');
  localStorage.removeItem('loginStart');
  localStorage.removeItem('refreshStart');

  // sessionStorage.removeItem('user');
}
