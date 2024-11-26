import { Chat } from "./Chat";
import { Message } from "./Message";
import "./App.css";
function App() {
  return (
    <div className="app-container">
      <h1>Chat app</h1>
      <div className="chat-container">
        <Chat />
      </div>
      <div className="message-container">
        <Message />
      </div>
    </div>
  );
}

export default App;
