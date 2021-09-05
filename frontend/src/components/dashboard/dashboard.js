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
import Navmenu from "./nav";
import Content from "./content";



export default function Dashboard(props){



    return(
        
<main>
    <Row className="container" >
        <Col md={3}>
            <Navmenu></Navmenu>
        </Col>

        <Col sm={9}>
            <Content></Content>
        </Col>
    </Row>

</main>        
    );
    
}

