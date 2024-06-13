import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Box, Button, Typography, TextField, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack , Grid } from '@mui/material';
import './intro.css'
import { doc, setDoc } from "firebase/firestore";  // Import these functions
import { db } from './../firebaseConfig';  // Assuming you have a firebaseConfig file exporting your Firestore instance



const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    weight: '',
    age: '',
    activity: 'moderate',
    gender: 'male',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        console.log('Form Data:', formData);
        // Create a new document in collection "users"
        const docRef = doc(db, "users", formData.email);  // Using email as document id for uniqueness
        await setDoc(docRef, {
          ...formData,
          createdAt: new Date()  // Optional: store creation date
        });
    
        console.log("Document written with ID: ", docRef.id);
        navigate('/map');  // Navigate to a welcome or dashboard page after successful registration
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };

  return (
    <div className="background-image">
    <Card sx={{
    width: '20cm', height: '15cm',
    display: 'flex', flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', padding: '20px',
    backgroundColor: 'rgba(256, 256, 256, 0.3)', // Grey with opacity
    backdropFilter: 'blur(2px)', // Optional: Blur effect on the card
    boxShadow: 15,
    marginX : '10cm', marginY : '3cm'
    }}>
    <Grid container>
      <Grid item xs={6} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(256, 256, 256, 0.6)', // Slightly more transparent
        backdropFilter: 'blur(4px)', // Enhanced blur effect
        width:'20cm',height:'15cm'
      }}>
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Stack spacing={2} alignItems="center">
      <TextField
              fullWidth = {false}
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ width: '300px' , height: '1cm'}}
            />
            <br></br>
            <TextField
              fullWidth = {false}
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ width: '300px' , height: '1cm'}}
            />
            <br></br>
            <TextField
              fullWidth
              label="Weight (kg)"
              variant="outlined"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              sx={{ width: '300px' , height: '1cm'}}
            />
            <br></br>
            <TextField
              fullWidth
              label="Age"
              variant="outlined"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              sx={{ width: '300px' , height: '1cm'}}
            />
            <br></br>
            <TextField
              select
              label="Everyday Activity"
              value={formData.activity}
              onChange={handleChange}
              fullWidth
              name="activity"
              sx={{ width: '300px' , height: '1cm' , marginX: '1cm'}}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="moderate">Moderate</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </TextField>
            <br></br>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth={false}
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ width: '300px' , height: '1cm'}}
            />
            <br></br>
        <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: 'blue', color: '#fff' }}>
              Register
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

export default Signup;
