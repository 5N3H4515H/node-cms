//app.js
// const chokidar = require('chokidar');
const { spawn } = require('child_process');
const port = 3002;
const express = require('express');
const app = express();

let child;
// Watch all files in the project directory (modify the path if needed)
// const watcher = chokidar.watch('./', {
//   ignored: /node_modules|\.git/,
//   persistent: true,
// });

// Log file changes
// watcher.on('all', (event, path) => {
//   console.log(`${event}: ${path}`);
//   restartServer();
// });

app.get('/restart-server', (req,res) => {
    restartServer();
    res.send("Restarting server...");
});

app.listen(port, (error) => {
    if(error){
        console.log('Something went wrong', error);
    }else{
        console.log(`Server is running on http://localhost:${port}`);
    }
});

// Function to restart the server
function restartServer() {
  console.log('Restarting server...');
  if (child) {
    child.kill('SIGTERM');
  }

  child = spawn('node', ['src/server.js'], { stdio: 'inherit' });

  child.on('close', (code) => {
    if (code !== 0) {
        console.error('App crashed. Waiting for changes to restart...');
      }
  });

  // Log errors if any
  child.on('error', (err) => {
    console.error(`Error while restarting server: ${err.message}`);
  });
}

// console.log('Watching for file changes...');

