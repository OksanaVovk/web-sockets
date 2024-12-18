import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const remoteUrl = "wss://ws.postman-echo.com/raw";
//const localUrl = "ws://localhost:8082";

const ws = new WebSocket(remoteUrl); //Create Web Socket object here and pass it as a prop into App

root.render(
  <React.StrictMode>
    <App ws={ws} />
  </React.StrictMode>
);
