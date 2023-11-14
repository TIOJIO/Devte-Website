import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Log from './log.png'
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <Paper
    elevation={0}
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: '90%',
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <h1>.</h1>
            <h1 style={{fontWeight:'bold',color:'#003366'}}>DevteStartup</h1>
            <h2>Le train du developpement et de l'inovation techonologique . nous somme une agence digital de developpement de logiciel.</h2>
            <Button variant="contained" style={{backgroundColor:"#003366" ,height:'60px',width:'40%'}} disableElevation>
                About Us
            </Button>
          </Grid>
          <Grid item>
            <img width={500} height={500} src={Log}/>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}