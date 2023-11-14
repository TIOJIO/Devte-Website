import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Log from './log.png'
import Home from '../Home/Home'
import './login.css'


const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = ['Home', 'About', 'Help', 'Team'];

  const drawerContent = (
    <List style={{width:'100%',marginTop:'50px'}}>
      {menuItems.map((item) => (
        <ListItem  button key={item}>
          <ListItemText style={{color:'white',fontWeight:'bold',fontSize:'20px' }} primary={item} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <div style={{backgroundColor:'white'}}>
    <div className="animated-block">
      <p>.</p>
      <AppBar position="center"  style={{ backgroundColor: 'rgba(255, 255, 255, 0.881)',borderRadius:'15px',width:'97%',margin:'auto' }}>
        <Toolbar>

          <div style={{ flexGrow: 1 }}>
            <img style={{width:'150px' , height:'90px'}} src={Log}/>
          </div>

          <Hidden style={{width:'50%'}} smDown>
            {menuItems.map((item) => (
              <div key={item} style={{ margin: '0 10px',color:'#003366',fontWeight:'bold',fontSize:'20px' }}>
                {item}
              </div>
            ))}
          </Hidden>

          <Hidden mdUp>
            <IconButton  onClick={toggleDrawer}>
              <MenuIcon style={{color:'#003366',fontSize:'40px' }} />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>

      <Drawer zIndex='2'  color='#003366' anchor="left"   open={drawerOpen} onClose={toggleDrawer}>
      <div
          style={{ width: '300px', padding: '16px',backgroundColor:'#003366' }}
        >
           
            {drawerContent}
        </div>
        <p>.</p>
      </Drawer>
       
    </div>
    </div>
  );
};

export default Header;
