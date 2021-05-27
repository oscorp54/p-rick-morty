import React from 'react';
import Image from 'next/image'

import Link from '../../src/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",    
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function LayoutTextFields({ todo }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Proyecto de prueba: Rick y Morty
        </Typography>
        <br />
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Image src={todo.image} width={120} height={120}></Image>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Nombre del sujeto"
                value={todo.name}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-full-width"
                label="Estado"
                value={todo.status}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-full-width"
                label="Estado"
                value={todo.species}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-full-width"
                label="Genero"
                value={todo.gender}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" component={Link} naked href="/">
                Volver
              </Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Container>
  );
}
  
export const getServerSideProps = async (context) => {
  const res = await fetch(
    `http://localhost:3001/character/${context.params.id}`
  );
  const todo = await res.json();

  return {
    props: {
      todo,
    },
  };
};