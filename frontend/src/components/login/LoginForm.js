import React, {useState} from "react";
import axios from 'axios'
// import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link, Redirect } from 'react-router-dom';
import { setUserSession, getApi} from '../Utils/Common';
import Card from 'react-bootstrap/Card'



export default function LoginForm(props){
  const [input , setInput] = useState({
    userName : "",
    password : "",
});
const [error, setError] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [errorShow, setErrorShow] = useState(false);
const [redirect, setRedirect] = useState(false);
const [labelShowU, setLableShowU] = useState(false);
const [labelShowP, setLableShowP] = useState(false);


let validate = ()=>{
  let errors = [];
  let isValid = true;

  if (input.userName === "") {
    isValid = false;
    setIsError(true);
    errors += "نام کاربری خود را وارد کنید\n";
  }    
  if (input.password === "") {
    isValid = false;
    setIsError(true);
    errors += "رمز عبور را وارد کنید\n";
  }


  setError(errors)
  
  
  return isValid;

}
let handleSubmit = (event)=>{

    event.preventDefault();
    console.log("error", error );
  console.log(input.userName , input.password);
  if(validate()){
    setIsLoading(true);
    setError(null);
    const url=getApi();
    axios.post(`${url}/api/token/`,{
        username : input.userName,
        password : input.password,
    },
    {
      headers:{
        'Content-Type': 'application/json',}
    }
    ).then( response => {

    console.log(response.data);
    setUserSession(response.data.token);
  
    setIsLoading(false);
    setRedirect(true);
    
    console.log("error", error );

    }).catch((e) => {
      if(e.response){
        setError(e.response.data.detail);
        e.response.status === 401? setError("نام کاربری و یا رمز عبورتان نادرست است"):setError("");
      }
      else{
        setError("مشکلی در سامانه پیش آمده ویا به اینترنت متصل نیستید؛ پیشاپیش از صبوریان متشکریم");
      }
      setIsError(true);
      //console.log(e.response.data.detail);
      // console.log(e);
      console.log(e.response);

      setIsLoading(false);
      
    });
  }
  
}

// let handleClose = ()=>{setForgotShow(false);}
// let handleShow = ()=>{setForgotShow(true);}
if(redirect) return <Redirect to='/dashboard'/>;
return(
  <main>
        {/* <section id="container"> */}
          <section id="container-login" >          
            <h5>ورود به حساب کاربری</h5>
              
              <form className=""  to="/dashboard" method="POST" onSubmit={handleSubmit} >
                        <label variant="danger" className="texts text-danger pb-3">
                          {isError ? error 
                          :null }
                        </label>

                        <legend class="border-bottom mb-4"></legend>  
                          <div className="form-group rounded-lg shadow-top-sm">
                            {labelShowU && <label >نام کاربری:</label>}
                          <input 
                              aria-label="userName" 
                              name="userName" 
                              type="text" 
                              // required 
                              className="form-control text-center  "
                              placeholder="شماره ی دانشجویی"
                              onChange={(e) => {setInput({...input, userName : e.target.value})}}
                              
                          />
                          {/* <p className="text-danger"> {isError ? error["userName"]:null } </p> */}
                          </div>

                          <div className="form-group rounded-lg shadow-top-sm" >
                            {labelShowP && <label>رمزعبور:</label> }
                          <input 
                              aria-label="password" 
                              name="password" 
                              type="password" 
                              // required 
                              className="form-control text-center"
                              placeholder="رمز عبور"
                              onChange={(e) => {setInput({...input, password : e.target.value}); }}
                             
                              />
                              {/* <p className="text-danger"> {isError ?error["password"]:null} </p> */}
                          </div>
                          
                         
                           
                         
                          
                          <Button
                                    type="submit"
                                    varient="primary"
                                    className=" d-block mx-auto my-3 px-5 mt-4"
                                    
                                    >
                                    
                                    {isLoading ? <Spinner animation="border" variant="primary" /> : 'ورود به حساب کاربری'}
                          </Button>
                          
                          <div className="form-group text-center" >
                            <Link className="text-info" variant="light" to="/forgotPassword">
                              رمزعبور خود را فراموش کرده اید؟
                            </Link>
                          </div>
                          {/* {forgotShow &&
                              <ForgotPassword
                              show={forgotShow}
                              onHide={handleClose}
                            />
                            
                            } */}
                  </form>
                  
                

            
            
        
            
            
    </section>
    {/* </section> */}
    </main>

);


}
