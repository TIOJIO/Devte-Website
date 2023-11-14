import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
//import PanelHeader from "components/PanelHeader/PanelHeader.js";
import React ,{useEffect} from 'react';
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Home from './Home/Home'




const Login = (props) => {
  
 
    return (
  
      <div style={{ backgroundColor:'white'}}>
                  <Header/>
                   <Home/>
                  <Footer/>
                 
    </div>
     
    );
  
}

export default Login;

















