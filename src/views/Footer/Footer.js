import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookInIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MenuIcon from '@material-ui/icons/Menu';
import Log from './white.png'
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#003366',
    color: 'white',
    padding: theme.spacing(3),
  },
  logo: {
    maxWidth: 200,
    maxHeight: 200,
  },
  socialIcons: {
    marginTop: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} square>
      <Grid container spacing={3}>
        {/* Premier bloc avec le logo et du texte */}
        <Grid item xs={12} sm={6} md={3}>
          <img src={Log} alt="Logo" className={classes.logo} />
          <p> Le train du developpement et de l'innovation technologique a votre porter. pour vos projet. </p>
         
          <br/>
          <h3>Our Social Media</h3>
          
        </Grid>

        {/* Deuxième bloc avec titre, texte et lien */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Our developpemnt Technology</Typography>
 
            <br />
            <p> Web Design</p>
            <p> UX Design</p>
            <p> Mobile Ux</p>
            <p> Web developpement</p>
            <p> Mobile developpement</p>

        </Grid>

        {/* Troisième bloc avec titre, texte et lien */}
        <Grid item xs={12} sm={6} md={3}>
            <br />
            <br />
            <p> Web Design</p>
            <p> Python & Django</p>
            <p> NodeJs</p>
            <p> Express</p>
            <p> WordPress</p>
        </Grid>

        {/* Quatrième bloc avec formulaire et icônes sociales */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Contactez-nous</Typography>
          <form>
            <TextField  style={{backgroundColor:'white',borderRadius:'10px',marginTop:'10px'}}label="Email" fullWidth />
            <TextField style={{backgroundColor:'white',borderRadius:'10px',marginTop:'10px'}} label="Message" multiline rows={4} fullWidth />
            <Button style={{marginTop:'10px'}} variant="contained" color="white" fullWidth>
              Envoyer
            </Button>
          </form>
          
        </Grid>
      </Grid>
      
      <Divider style={{backgroundColor:"white",height:'2px',borderRadius:'5px',marginTop:'30px'}}/>
           <br/>
           <Paper
             elevation={0}
             style={{backgroundColor:'#003366'}}
                  sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: '90%',
                    flexGrow: 1,
                    backgroundColor:'#003366'
                      
                  }}
               >
                <Grid container spacing={2}>
                  
                  <Grid item xs={12}  sm container>
                    <Grid item xs container direction="row" spacing={2}>
                      <Grid item><p style={{fontWeight:'bold',color:'white'}}>© DevTe 2023</p></Grid>
                      <Grid item><p style={{fontWeight:'bold',color:'white'}}> License</p></Grid>
                      <Grid item><p style={{fontWeight:'bold',color:'white'}}> Confidentiality</p></Grid>
                    </Grid>
                    <Grid item xs={2} container direction="row" spacing={2}>
                      <Grid item><GitHubIcon style={{color:'white',fontSize:'30px' }} /></Grid>
                      <Grid item><YouTubeIcon style={{color:'white',fontSize:'30px' }} /></Grid>
                      <Grid item><LinkedInIcon style={{color:'white',fontSize:'30px' }} /></Grid>
                      <Grid item><FacebookInIcon style={{color:'white',fontSize:'30px' }} /></Grid>
                      <Grid item><TwitterIcon style={{color:'white',fontSize:'30px' }} /></Grid>
                    </Grid>
                  </Grid>
                </Grid>
    </Paper>
           
    </Paper>
  );
};

export default Footer;
