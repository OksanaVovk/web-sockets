import { useState, useEffect } from "react";
import "./App.css";

// Note: please, do not change the next things:
// - name of App prop,
// - placeholder and aria-label values
// - text on the button

function App({ ws }) {
  const [chatMessage, setChatMessage] = useState([]);
  const [inputValue, setInputValue] = useState({ nickname: "", message: "" });
  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to the server");
    };
    ws.onmessage = ({ data }) => {
      setChatMessage((oldDate) => [...oldDate, data]);
    };
  }, [ws]);

  const handelChange = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const onBtnClick = () => {
    ws.send(`${inputValue.nickname}: ${inputValue.message}`);
  };
  return (
    <div className="App">
      <h1>Web Sockets</h1>
      <div>
        <textarea
          rows="30"
          cols="60"
          readOnly
          aria-label="chat"
          value={chatMessage.join("\n")}
        />
      </div>
      <input
        placeholder="Your nickname"
        size="11"
        name="nickname"
        value={inputValue.nickname}
        onChange={handelChange}
      />
      <input
        placeholder="Type your message"
        size="40"
        name="message"
        value={inputValue.message}
        onChange={handelChange}
      />
      <button onClick={onBtnClick}>Send</button>
    </div>
  );
}

export default App;
