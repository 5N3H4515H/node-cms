import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:3002");

    newSocket.addEventListener("open", () => {
      console.log("WebSocket connection established.");
      setSocket(newSocket);
    });

    newSocket.addEventListener("message", (event) => {
      console.log("Received message:", event.data);
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket connection closed.");
      setSocket(null);
    });

    return () => {
      if (
        newSocket.readyState === WebSocket.OPEN ||
        newSocket.readyState === WebSocket.CONNECTING
      ) {
        newSocket.close();
      }
    };
  }, []);

  const requestServerRestart = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send("restart");
      console.log("Restart request sent to server.");
    }
  };

  return (
    <div className="App">
      <h1>WebSocket Client</h1>
      {socket ? (
        <button onClick={requestServerRestart}>Request Server Restart</button>
      ) : (
        <p>Connecting...</p>
      )}
    </div>
  );
}

export default App;
