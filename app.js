import React, {useEffect, useState} from 'react';


// import connection from './connection';
// import { connectDb } from 'C:/Users/malor/Desktop/project/BACKEND-healthy-SMU-project/config/connection';
const App = () => {


  

    // Connection to the api
    
    const [ backendData, setBackendData ] = useState([])
    
    useEffect(() => {
      
      fetch("/api").then(
        response => response.json()).then(
          data => {
          setBackendData(data);
        });
    
    
    
        /*const { connectDb, sequelize } = require('C:/Users/malor/Desktop/project/BACKEND-healthy-SMU-project/config/connection');
        const express = require('express');
        const app = express();
        const port = process.env.PORT || 3000; */
    
    
    }, []); }
    