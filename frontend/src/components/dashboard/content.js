import React, {useState, useEffect} from "react";
import axios from 'axios'
// import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link, Redirect } from 'react-router-dom';
import { setUserSession, getApi, getToken} from '../Utils/Common';
import Card from 'react-bootstrap/Card'
import '../../nav.css'
import Navmenu from "./nav";
import CeramicLine from "./CeramicLine";


export default function Content(props){

    const [productLine, setProductLine] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isResponced, setIsResponced] = useState(false);
 
    const url=getApi();
 
    useEffect(()=>{
        setIsLoading(true);
        axios.get(`${url}/api/productline/`,{
        },
        {
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `jwt ${getToken()}`
        }
        }
        ).then( response => {            
            setIsLoading(false);
            // console.log(response)
            setProductLine(response.data)
            
            }).catch((e) => {
                // if(e.response === 403){
                    // setError("به این محتوا دسترسی ندارید")
                // }
              setError(e.response);
              //console.log(e.response.data.detail);
              // console.log(e);
              console.log(e.response);
              setIsLoading(false);

        });
    },[url])

    return(        
        <section >
            <section id="line" className="line">
                
                    {loading? <Spinner animation="border" variant="primary" />:
                    <Row >
                        {productLine.map( (line, i) => 
                        <Row className="container-lines align-content-center" key={i}>
                            <Row>
                                <h6>
                                {line.name}
                                </h6>
                            </Row>                            
                            {console.log(line.id)}
                            <Row>
                                <Col >
                                    <CeramicLine pLine={line.id}></CeramicLine>
                                </Col>
                            </Row>
                        </Row>
                        )}
                    
                    </Row>
                    }
               
            </section>
        </section>
    );
    
}

