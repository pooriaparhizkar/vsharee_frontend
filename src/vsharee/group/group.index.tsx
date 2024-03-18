import React, { useContext, useEffect, useRef, useState } from "react";
import { authToken } from "../../scripts/storage";
import { Link, useParams } from "react-router-dom";
import { RoutePaths } from "../../data";
import { UserData } from "../../interface";
import { GlobalContext } from "../../context";

function Group() {
  const [ws, setWs] = useState<any>(null);
  const [newMessage, setNewMessage] = useState<string>();
  const [messagesToShow, setMessagesToShow] = useState<string[]>([]);
  const { userData } = useContext(GlobalContext);
  const [onlineMembers, setOnlineMembers] = useState<UserData[]>([]);
  const { id } = useParams();
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Send a heartbeat message every 30 seconds
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
      setInterval(() => {
        newWs.send(JSON.stringify({ type: "heartbeat" }));
      }, 30000);
    };

    newWs.onmessage = function (event) {
      const wsData = JSON.parse(event.data);
      const sender = wsData.sender;
      let data = wsData.data;
      data = typeof data === "string" ? JSON.parse(data) : data;
      const type = data?.type;
      const content = data?.content;
      console.log(data, type, content);
      switch (type) {
        case "heartbeat":
          return;
        case "chat":
          setMessagesToShow((prevMessages) => [
            ...prevMessages,
            sender.username + ": " + content,
          ]);
          break;
        case "prev-online":
          setOnlineMembers(content);
          break;
        case "online":
          setOnlineMembers((prevMembers) => {
            if (!prevMembers.find((member) => member._id === content._id))
              return [...prevMembers, content];
            return prevMembers;
          });
          break;
        case "offline":
          setOnlineMembers((prevMembers) =>
            prevMembers.filter((member) => member._id !== content._id)
          );
          break;
        case "movie":
          if (videoRef.current) {
            if (content === "play") videoRef.current.play();
            else if (content === "pause") videoRef.current.pause();
          }
          break;
      }
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
        ws.send(JSON.stringify({ type: "chat", content: newMessage }));
        setNewMessage("");
      }
    } else {
      console.error("WebSocket connection not established.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const playVideo = () => {
    if (ws) {
      if (videoRef.current) {
        ws.send(JSON.stringify({ type: "movie", content: "play" }));
        videoRef.current.play();
      }
    } else {
      console.error("WebSocket connection not established.");
    }
  };

  const stopVideo = () => {
    if (ws) {
      if (videoRef.current) {
        ws.send(JSON.stringify({ type: "movie", content: "pause" }));
        videoRef.current.pause();
      }
    } else {
      console.error("WebSocket connection not established.");
    }
  };

  return (
    <div>
      <Link to={RoutePaths.dashboard}>Dashboard</Link>
      <div>
        <h4>Online Members</h4>
        {onlineMembers.map((member, index) => (
          <p key={index}>{member.username}</p>
        ))}
      </div>
      <input
        placeholder="send a message"
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <button onClick={handleSend}>Send</button>
      {messagesToShow.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {selectedVideo && (
        <>
          <video style={{ width: "100%", height: 200 }} ref={videoRef} controls>
            <source src={URL.createObjectURL(selectedVideo)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div>
            <button onClick={playVideo}>Play</button>
            <button onClick={stopVideo}>Stop</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Group;
