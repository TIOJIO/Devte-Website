import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
//import PanelHeader from "components/PanelHeader/PanelHeader.js";
import React ,{useEffect} from 'react';
import LoginUser from './LoginUser/LoginUser'
import Footer from './Footer/Footer'




const Login = (props) => {
  
 
    return (
  
      <div style={{ backgroundColor:'#d3d0d0'}}>
                  <LoginUser/>
                  <Footer/>
                 
    </div>
     
    );
  
}

export default Login;

















