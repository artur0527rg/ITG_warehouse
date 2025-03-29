import { useState, useRef, useEffect } from "react";

export const useWs = () => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);
  const ws = useRef(null);

  const BASE_URL = process.env.WS_URL + "/ws/board/";

  useEffect(() => {
    // If connection is already open, don't create a new one
    if (ws.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const socket = new WebSocket(BASE_URL);

    socket.onopen = () => {
      setIsReady(true);
    };

    socket.onclose = () => {
      setIsReady(false);
      // Not attempting automatic reconnection (can add reconnect with delay)
    };

    socket.onmessage = (event) => {
      setVal(event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      socket.close();
    };

    ws.current = socket;

    return () => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [BASE_URL]); // Dependency only on BASE_URL to avoid unnecessary reconnections

  // bind is needed to make sure `send` references correct `this`
  return [isReady, val, ws.current?.send.bind(ws.current)];
};