import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Settings from '@mui/icons-material/Settings';
import logo1 from './fr.jpg';
import logo2 from './an.jpg';
import i18n from "i18next";
import { useTranslation } from "react-i18next";
require('moment/locale/fr');



const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: "rgb(17, 141, 65)",
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function AlertDialog({onClose}) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [openn, setOpenn] = React.useState(false);

  const handleClose1 = () => {
    setOpenn(false);
  };

    const changeLanguage = (lng) => {
        localStorage.setItem("lang", lng);
        const lang = localStorage.getItem("lang");
        i18n.changeLanguage(lng).then(r => setOpen(false));
        onClose();
    }

    const handleClickOpen = () => {
    setOpen(true);

  
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>

    <StyledMenuItem  onClick={handleClickOpen} >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Langues" />
        </StyledMenuItem>
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {t("select_language")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

                <div  style={{display:'flex',cursor:'pointer'}}>
                    <img onClick={() => changeLanguage('fr')}  style={{width:'30px',height:'30px'}} src={logo1}/>&nbsp;&nbsp;
                    <p> Francais</p>

                </div>

                <br></br>

                 <div  style={{display:'flex',cursor:'pointer'}}>
                  <img onClick={() => changeLanguage('en')} style={{width:'30px',height:'30px'}} src={logo2}/>&nbsp;&nbsp;
                   <p> English</p>

                 </div>
                 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
    
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openn}
        onClick={handleClose1}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}