import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../../contexts/TripContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {login } = useTripContext(); // Use context to get user and setTrips

  const handleLogin = () => {
    login(email, password);
    navigate('/'); // Redirect to homepage after login
  };
  const navSignUp = () => {
    navigate('/signup');
  }
  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth={true} variant="contained" color="primary" onClick={handleLogin} sx={{ marginTop: 2}}>
          Login
        </Button>
        
      </form>
      <Typography variant="subtitle1" gutterBottom sx={{marginTop: 2}}>
      Don't have an account? <Link href="/signup">Sign Up</Link>
        </Typography>
    </Container>
  );
};

export default Login;
