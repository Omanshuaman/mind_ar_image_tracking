import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./utils/main.js";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <canvas id="renderCanvas"></canvas>
      <div id="app">
        <div id="overlay">
          <div id="tracking-prompt">
            <img src="hand.png" />
          </div>
        </div>

        <div id="ar-not-supported">
          <p>
            WebXR Not Supported. Open this page on Android to view the example.
          </p>
          <img id="qr-code" />
        </div>
      </div>
    </>
  );
}

export default App;
