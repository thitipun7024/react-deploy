import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from "@mui/material";
import Avatar from '@mui/material/Avatar';

export default function UserUpdate() {  
  const { id } = useParams();
  const [result, setUsers] = useState([])
  useEffect(() => {
    fetch("http://localhost:3333/updateuser/"+id ,{
        method: 'POST',
        })
      .then(res => res.json())
      
      .then(
        
        (result) => { 
          setUsers(result)
        }
      )
  }, [id])

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatedata = {
      fname: data.get("fname"),
      lname: data.get("lname"),
      username: data.get("username"),
      email: data.get("email"),
      avatar: data.get("avatar"),
      id: id,
    }
    fetch('http://localhost:3333/update', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedata),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert('update success')
        if (result['status'] === 'ok') {
          window.location.href = '/';
        }
      }
    )
  }

  return (
    <Container sx={{ p:2 }} maxWidth="sm">    
      <div>
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
            >
          <Avatar alt="Travis Howard" src="https://cdn.dribbble.com/users/1061278/screenshots/12883393/wolf3.png" sx={{ width: 70, height: 150 }}/>
          <Typography component="h1" variant="h5">
            User
          </Typography>
          <p></p>
        {result.map((user) => (
        
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ pt:2 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                label="First Name"
                defaultValue={user.fname}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                name="lname"
                label="Last Name"
                defaultValue={user.lname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                name="username"
                label="Username"
                defaultValue={user.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                defaultValue={user.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="avatar"
                name="avatar"
                label="Avatar"
                defaultValue={user.avatar}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
            </Button>
            </Grid>
          </Grid>
        </form>
        ))}
        </Box>
      </div>
    </Container>
  );
}