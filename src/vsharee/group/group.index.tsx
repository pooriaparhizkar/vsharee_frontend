import React, { useEffect, useState } from "react";
import { authToken } from "../../scripts/storage";
import { useParams } from "react-router-dom";

function Group() {
  const [ws, setWs] = useState<any>(null);
  const [newMessage, setNewMessage] = useState<string>();
  const [messagesToShow, setMessagesToShow] = useState<string[]>([]);
  const { id } = useParams();

  useEffect(() => {
    // Create WebSocket connection when component mounts
    const newWs = new WebSocket(
      `ws://localhost:8000?token=${authToken.get()?.access_token}&groupId=${id}`
    );

    // Set WebSocket instance to state
    setWs(newWs);

    // Add event listeners
    newWs.onopen = function () {
      console.log("Connected to WebSocket server");
    };

    newWs.onmessage = function (event) {
      setMessagesToShow((prevMessages) => [...prevMessages, event.data]);
    };

    // Clean up function to close WebSocket connection when component unmounts
    return () => {
      newWs.close();
    };
  }, []); // Empty dependency array ensures effect runs only once on component mount

  const handleSend = () => {
    // Check if WebSocket instance exists before sending message
    if (ws) {
      if (newMessage && newMessage !== "") {
        setMessagesToShow([...messagesToShow, newMessage]);
        ws.send(newMessage);
        setNewMessage("");
      }
    } else {
      console.error("WebSocket connection not established.");
    }
  };

  return (
    <div>
      <input
        placeholder="send a message"
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <button onClick={handleSend}>Send</button>
      {messagesToShow.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}

export default Group;
