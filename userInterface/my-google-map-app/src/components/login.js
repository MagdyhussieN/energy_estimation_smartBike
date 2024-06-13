import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './intro.css';
import { Card, Box, Button, Typography, TextField , Stack , Grid } from '@mui/material';
const Intro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    navigate('/map');
  };

  return (
        <div className="background-image">
        <Card sx={{
        width: '15cm', height: '12cm',
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', padding: '20px',
        backgroundColor: 'rgba(256, 256, 256, 0.3)', // Grey with opacity
        backdropFilter: 'blur(2px)', // Optional: Blur effect on the card
        boxShadow: 15,
        marginX : '12cm', marginY : '4cm'
        }}>
        <Grid container>
          <Grid item xs={6} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(256, 256, 256, 0.6)', // Slightly more transparent
            backdropFilter: 'blur(4px)', // Enhanced blur effect
            width:'10cm',height:'12cm'
          }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Stack spacing={2} alignItems="center">
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              sx={{width:'7cm' , height:'1cm'}}
            />
            <br></br>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              sx={{width:'7cm' , height:'1cm'}}
            />
            <br></br>
            <Button type="submit" variant="contained" sx={{ backgroundColor: 'blue', color: '#fff' }}>
              Sign In
            </Button>
          </Stack>
        </form>
          </Grid>
          <Grid item xs={6} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 1)', // Normal white
          }}>
            <img src="/il_fullxfull.2785655981_h5tp.jpg.avif" alt="Company Logo" style={{ width: '80%', height: 'auto' }} />
          </Grid>
        </Grid>
        </Card>
    </div>
    );
  };

export default Intro;