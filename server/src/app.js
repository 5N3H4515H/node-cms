//app.js
const express = require('express');
const WebSocket = require('ws');
const app = express();
const wss = new WebSocket.Server({ noServer:true });
const { spawn } = require('child_process');
const port = 3002;
let child;

wss.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for messages from clients
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    
    if (message == 'restart') {
      restartServer();
    }
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('Server restarted successfully');
      }
    });
  });

  // Handle disconnection
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

// Attach the WebSocket server to the existing Express server
const httpServer = app.listen(port, (error) => {
  if(error){
      console.log('Something went wrong', error);
  }else{
      console.log(`Server is running on http://localhost:${port}`);
  }
});

httpServer.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
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



