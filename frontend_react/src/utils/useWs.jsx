import { useState, useRef, useEffect } from "react"

export const useWs = () => {
  const [isReady, setIsReady] = useState(false)
  const [val, setVal] = useState(null)

  const ws = useRef(null)

  const BASE_URL = process.env.WS_URL + '/ws/board/'

  useEffect(() => {
    if(isReady) return

    const socket = new WebSocket(BASE_URL)

    socket.onopen = () => setIsReady(true)
    socket.onclose = () => setIsReady(false)
    socket.onmessage = (event) => setVal(event.data)

    ws.current = socket

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [isReady])

  // bind is needed to make sure `send` references correct `this`
  return [isReady, val, ws.current?.send.bind(ws.current)]
}