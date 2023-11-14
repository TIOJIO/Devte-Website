import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#003366',
    color: 'white',
    padding: theme.spacing(3),
  },
  logo: {
    maxWidth: 100,
    maxHeight: 100,
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
          <img src="path/to/your/logo.png" alt="Logo" className={classes.logo} />
          <Typography variant="body2">
            Votre texte ici...
          </Typography>
        </Grid>

        {/* Deuxième bloc avec titre, texte et lien */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Titre 1</Typography>
          <Typography variant="body2">
            Votre texte ici...
            <br />
            <a href="#">Votre lien</a>
          </Typography>
        </Grid>

        {/* Troisième bloc avec titre, texte et lien */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Titre 2</Typography>
          <Typography variant="body2">
            Votre texte ici...
            <br />
            <a href="#">Votre lien</a>
          </Typography>
        </Grid>

        {/* Quatrième bloc avec formulaire et icônes sociales */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Contactez-nous</Typography>
          <form>
            <TextField  style={{backgroundColor:'white',borderRadius:'10px',marginTop:'10px'}}label="Email" fullWidth />
            <TextField style={{backgroundColor:'white',borderRadius:'10px',marginTop:'10px'}} label="Message" multiline rows={4} fullWidth />
            <Button style={{marginTop:'10px'}} variant="contained" color="primary" fullWidth>
              Envoyer
            </Button>
          </form>
          <div className={classes.socialIcons}>
             <GitHubIcon style={{color:'white',fontSize:'40px' }} />
             <MenuIcon style={{color:'white',fontSize:'40px' }} />

          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Footer;
