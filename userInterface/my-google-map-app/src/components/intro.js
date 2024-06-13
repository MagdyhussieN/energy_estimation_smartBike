import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './intro.css';
import { Card, Box, Button, Typography, TextField , Stack , Grid } from '@mui/material';
const Intro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    weight: '',
    age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    navigate('/map');
  };
  const handleLogin = () => {
    // Logic for Login
    navigate('/login'); // Adjust the path as needed
  };

  const handleSignup = () => {
    // Logic for Signup
    navigate('/signup'); // Adjust the path as needed
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
            <Typography variant="h5" sx={{ mb: 2 }}>Hello Rider!</Typography>
            <Stack direction="row" spacing={2}>
            <Button variant="contained" sx={{ backgroundColor: 'blue', color: '#fff', mb: 2 }} onClick={handleLogin}>
              Login
            </Button>
            <Button variant="contained" sx={{ backgroundColor: 'green', color: '#fff' }} onClick={handleSignup}>
              Signup
            </Button>
            </Stack>
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

