import Register from "./components/Register";
import Thanks from "./components/Thanks";
import ipConfig from "./ipConfig.json";
import { BrowserRouter, Routes,Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Products from "./components/Products";
import {ThemeProvider} from "@mui/material";
// import { ThemeProvider } from 'react-ui'
import theme from "./theme"
import React from "react";
export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div >
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
          {/* <Register /> */}
         
          {/* <ThemeProvider theme={theme}> */}
         
          {/* <Login/>  */}
          {/* <Products/> */}
         
          {/* <Switch>
        <Route path="/" element={<Products/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Switch> */}
      
          {/* </ThemeProvider> */}
          <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/thanks">
        <Thanks />
      </Route>
      <Route path="/checkout">
        <Checkout />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <Products />
      </Route>
    </Switch>
    </div>
  );
}

export default App;
