import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack,TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom"

const Header = ({ children, hasHiddenAuthButtons }) => {

  const history = useHistory();

  const handleBackToExplore = () => {
    history.push('/');
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
    window.location.reload()
    
  };
  const handleLogin = () => {
    history.push('/login');
  };

  const handleRegister = () => {
    history.push('/register');
  };

  const username = localStorage.getItem('username');
  //console.log(user);
  const renderAuthButtons = () => {
    if(hasHiddenAuthButtons){

      return (

        <Button
        className="explore-button"
        startIcon={<ArrowBackIcon />}
        variant="text"
        onClick = {()=>{handleBackToExplore()}}
      >
        Back to explore
      </Button>
      )
    }if (username !== null) {
      // The item is set in localStorage
      return (
        <Stack direction="row" spacing={2}>

    <Avatar alt={username} src="public/avatar.png" />
    <h4
        className="username-text"
        
        variant="text"
        id = "username"
      >
         {username}
      </h4>
   
        <Button
        className="explore-button"
        // startIcon={<ArrowBackIcon />}
        variant="text"
        onClick = {()=>{handleLogout()}}
      >
        LOGOUT
      </Button>
</Stack>
      
        
      )
    }else{
     return( <Stack direction="row" spacing={2}>
       <Button
        className="explore-button"
        // startIcon={<ArrowBackIcon />}
        variant="text"
        onClick = {()=>{handleLogin()}}
      >
        LOGIN
      </Button>
      <Button
        className="explore-button"
        // startIcon={<ArrowBackIcon />}
        variant="text"
        onClick = {()=>{handleRegister()}}
      >
        REGISTER
      </Button>
      </Stack>)
    }
  }

//console.log(hasHiddenAuthButtons , "----")
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Box>
        <Stack direction="row" spacing={3}>
        {children}
       {renderAuthButtons()}
       </Stack>
       </Box>
      </Box>
    );
};

export default Header;
