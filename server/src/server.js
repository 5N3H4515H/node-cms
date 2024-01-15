//server.js
const port = 3000;
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Babu!');
});

app.listen(port, (error) => {
    if(error){
        console.log('Something went wrong', error);
    }else{
        console.log(`Server is running on http://localhost:${port}`);
    }
});
