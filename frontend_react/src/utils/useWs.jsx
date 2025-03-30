import { useState, useRef, useEffect } from "react";

export const useWs = () => {
  const [isReady, setIsReady] = useState(false);
  const messagesMap = useRef(new Map()); // Храним сообщения по UUID
  const [trigger, setTrigger] = useState(0);
  const ws = useRef(null);

  const BASE_URL = process.env.WS_URL + "/ws/board/";

  useEffect(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    const socket = new WebSocket(BASE_URL);

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (!message.uuid) {
          message.uuid = crypto.randomUUID();
        }
        messagesMap.current.set(message.uuid, message);
        setTrigger(prev => prev+1);
      } catch (error) {
        console.error("WS parse error:", error);
      }
    };

    ws.current = socket;

    return () => ws.current?.close();
  }, [BASE_URL]);

  const getMessages = () => {
    const messages = Array.from(messagesMap.current.values());
    return messages;
  };

  const ackMessage = (uuid) => {
    messagesMap.current.delete(uuid);
  };

  return [isReady, getMessages, ws.current?.send.bind(ws.current), trigger, ackMessage];
};