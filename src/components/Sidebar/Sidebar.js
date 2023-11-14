
import React from "react";
import { NavLink } from "react-router-dom";
import {Avatar} from '@material-ui/core';
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import packageJson from '../../../package.json';
var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div className="sidebar" style={{backgroundColor:'black'}} data-color={props.backgroundColor}>
      <br></br>  
      <div className="logo">
    
       <g> <a
          className="simple-text logo-normal"
          style={{color:'rgb(17, 141, 65)', fontWeight:'bold' , fontSize:'30px'}}
          target="_blank"
        >
          AppAcademia
        
        </a></g>
        <br></br>  
        <a>
        version: {packageJson.version}
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            if (prop.redirect) return null;
            return (
              <li

               style={{padding:'0px 0px 0px 15px'}}
                className={
                  activeRoute(prop.layout + prop.path) +
                  (prop.pro ? " active active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i  className={"now-ui-icons " + prop.icon} />
                  <p style={{fontSize:'15px',textTransform: 'capitalize'}}>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
