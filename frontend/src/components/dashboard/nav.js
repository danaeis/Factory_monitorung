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
import '../../nav.css'
// import avatar from '../../pics/avatar.png'
import avatar from '../../pics/icons/pesnl pic.png'

export default function Navmenu(props){




    return(
        
        <section className="justify-content-center">                  
        <section className="menu">
            <button id="closeMenuBtn" className="closeMenuBtn">
              <i className="fas fa-times"></i>
            </button>
            
            <div className="user">
              <a href="/profile " className="">
                <img
                src={avatar}
                alt="Profile"
                className="profile-pic"
              />
              </a>
              <div className="user-info">
                <p>Welcome</p>
                <a href="/profile"><h3></h3></a>
                <a href="/logout"className="logout">Logout</a>
              </div>
            </div>
            <div className="info">
              <div className="personal-info">
                

              </div>
              <div className="handle-btn">

              </div>
            </div>
            <section className="date">
              <a href="/admin" className="price_records_btn"><button className="price_records_btn"  >

              </button></a>
            </section>
        </section>
        </section>
    );
    
}

