import React, {useState, useEffect} from "react";
import axios from 'axios'
// import 'font-awesome/css/font-awesome.min.css';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link, Redirect, useParams } from 'react-router-dom';
import { setUserSession, getApi, getToken} from '../Utils/Common';
import Card from 'react-bootstrap/Card'



export default function CeramicLine(props){
    const id=props.pLine
    const [sensors, setSensors] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [type, setType] = useState([]);
    const [error, setError] = useState(null);
    const [typeError, setTypeError] = useState(null);

    const url=getApi();    

    useEffect(()=>{
        
        
        const getLineSensors = async () => {
            // console.log("sth else")
            await axios.get(`${url}/api/sensor/factoryline/${id}/`,{
            },
            {
            }
            ).then( response => {    
                // console.log("sth else rep",response.data)
                setIsLoading(false);
                setSensors(response.data)
                return type

            }).catch((e) => {
                setIsLoading(false);
                setError(e.data);
                return typeError
            });
        }
        setIsLoading(true);
        getLineSensors()
      
    },[url]);
    
    // let getSensorType = (event, sensor_type)=>{
    useEffect(()=>{    
        // console.log("sth")
        const getSensorTypes = async () => {
            await axios.get(`${url}/api/sensortype/`,{
            },
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `jwt ${getToken()}`
                }
            }
            ).then( response => {    
                // console.log(response.data)        
                setIsLoading(false);
                setType(response.data)
                return type

            }).catch((e) => {
                setIsLoading(false);
                setTypeError(e.data);
                return typeError
            });
        }
        setIsLoading(true);
        getSensorTypes()

        
    },[url]);

    return(
        <section className="container-sensors">            
            {loading? <Spinner animation="border" variant="primary" />:
                <Row>
                {sensors.map( (sensor, i) => 
                 <Col key={i}>
                 <span>
                     <div>
                     {console.log(sensor.type)}
                     {type.map((type, j) =>
                        <div key={j}>
                            {console.log(sensor.type , type.id)}
                            {sensor.type === type.id?
                                <img
                                    src={type.icon}
                                    alt="sensor-icon"
                                    className="sensor-icon"
                                />:
                                ""
                            }
                        </div>
                     )}
                    {console.log(sensor.type)}
                        {sensor.name}                        
                        {sensor.type}
                        {sensor.mac_addr}
                    </div>
                

                 </span>
                 </Col>
                
                )}
                </Row>
            }

            
        </section>
    );

}