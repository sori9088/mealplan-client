import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Avatar, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap'
import { makeStyles, createMuiTheme,  ThemeProvider} from '@material-ui/core/styles';
import { green, red, pink, orange } from '@material-ui/core/colors';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Meal Plan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});


export default function Signup() {
  const [input, setInput] = useState({avatar_url:"", seller:"false"})
  const history = useHistory()
  const hansol = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const register = async e => {
    e.preventDefault()
    const res = await fetch(process.env.REACT_APP_BURL + "/register", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(input)
    })
    if (res.ok) {
      const data = await res.json()
      if (data.success) {
        // window.location(process.env.REACT_APP_FURL+"/login") // redirect using window
        history.push('/login')

      } else {
        alert(data.message)
      }
    }
  }


  console.log(input)
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onChange={e => hansol(e)} onSubmit={(e) => register(e)}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="UserName / SellerName"
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="avatar_url"
                label="Profile Image URL"
                name="avatar_url"
                autoComplete="avatar_url"
              />
            </Grid>
            <Grid item xs={12}>
            <Form.Group controlId="exampleForm.ControlSelect1">
    <label>Example select</label>
    <Form.Control as="select" name="seller">
      <option value={false} >customer</option>
      <option value={true}>seller</option>
    </Form.Control>
  </Form.Group>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </ThemeProvider>
  );
}