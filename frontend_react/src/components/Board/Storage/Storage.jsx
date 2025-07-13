import { useRef, useEffect } from "react";
import Column from "./Column/Column";
import "./storage.css";

const Storage = ({ zone }) => {
  const lines = zone.lines.sort((a, b) => a.position - b.position);

  const containerRef = useRef(null);
  const transformState = useRef({
    scale: 1,
    translateX: 0,
    translateY: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    const scalableElement = containerRef.current;
    if (!scalableElement) return;

    // Move and scale storeage for PC's mouse
    const handleWheel = (event) => {
      event.preventDefault();

      const { scale, translateX, translateY } = transformState.current;
      const rect = scalableElement.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const offsetX = mouseX - rect.left;
      const offsetY = mouseY - rect.top;
      const scaleStep = 0.1;
      const prevScale = scale;

      // Update scale
      transformState.current.scale =
        event.deltaY < 0 ? scale + scaleStep : Math.max(scale - scaleStep, 0.1);

      const scaleFactor = transformState.current.scale / prevScale;
      transformState.current.translateX -= offsetX * (scaleFactor - 1);
      transformState.current.translateY -= offsetY * (scaleFactor - 1);

      applyTransform();
    };

    const handleMouseDown = (event) => {
      if (event.button === 1) {
        // Middle button
        event.preventDefault();
        transformState.current.isDragging = true;
        transformState.current.startX =
          event.clientX - transformState.current.translateX;
        transformState.current.startY =
          event.clientY - transformState.current.translateY;
      }
    };

    const handleMouseMove = (event) => {
      if (transformState.current.isDragging) {
        transformState.current.translateX =
          event.clientX - transformState.current.startX;
        transformState.current.translateY =
          event.clientY - transformState.current.startY;
        applyTransform();
      }
    };

    const handleMouseUp = (event) => {
      if (event.button === 1) {
        transformState.current.isDragging = false;
      }
    };

    const applyTransform = () => {
      const { scale, translateX, translateY } = transformState.current;
      scalableElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    };

    // Move on keyboard
    const handleKeyDown = (event) => {
      const moveStep = 20;
      switch (event.key) {
        case "ArrowDown":
          transformState.current.translateY -= moveStep;
          break;
        case "ArrowUp":
          transformState.current.translateY += moveStep;
          break;
        case "ArrowRight":
          transformState.current.translateX -= moveStep;
          break;
        case "ArrowLeft":
          transformState.current.translateX += moveStep;
          break;
        default:
          return;
      }
      applyTransform();
    };

    // Move and scale storeage for phone
    let lastTouchDistance = null;
    let lastTouchCenter = null;

    const getTouchDistance = (touches) => {
      const [a, b] = touches;
      const dx = b.clientX - a.clientX;
      const dy = b.clientY - a.clientY;
      return Math.hypot(dx, dy);
    };

    const getTouchCenter = (touches) => {
      const [a, b] = touches;
      return {
        x: (a.clientX + b.clientX) / 2,
        y: (a.clientY + b.clientY) / 2,
      };
    };

    const handleTouchStart = (event) => {
      if (event.touches.length === 2) {
        lastTouchDistance = getTouchDistance(event.touches);
        lastTouchCenter = getTouchCenter(event.touches);
      }
    };

    const handleTouchMove = (event) => {
      if (event.touches.length === 2) {
        event.preventDefault();

        const currentDistance = getTouchDistance(event.touches);
        const currentCenter = getTouchCenter(event.touches);

        const distanceDelta = currentDistance - lastTouchDistance;

        const { scale, translateX, translateY } = transformState.current;
        const prevScale = scale;

        // === Scaling ===
        let newScale = Math.max(prevScale + distanceDelta * 0.005, 0.1);
        const scaleFactor = newScale / prevScale;

        const rect = scalableElement.getBoundingClientRect();
        const offsetX = currentCenter.x - rect.left;
        const offsetY = currentCenter.y - rect.top;

        transformState.current.scale = newScale;
        transformState.current.translateX -= offsetX * (scaleFactor - 1);
        transformState.current.translateY -= offsetY * (scaleFactor - 1);

        // === Movement  ===
        const dx = currentCenter.x - lastTouchCenter.x;
        const dy = currentCenter.y - lastTouchCenter.y;

        transformState.current.translateX += dx;
        transformState.current.translateY += dy;

        lastTouchDistance = currentDistance;
        lastTouchCenter = currentCenter;

        applyTransform();
      }
    };

    const handleTouchEnd = (event) => {
      if (event.touches.length < 2) {
        lastTouchDistance = null;
        lastTouchCenter = null;
      }
    };

    // Add handlers
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    document.addEventListener("keydown", handleKeyDown);

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    // Clean handlers
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      document.removeEventListener("keydown", handleKeyDown);

      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
  return (
    <div
      ref={containerRef}
      id="storage-container"
      className="storage-container"
      style={{ transformOrigin: "0 0" }}
    >
      {lines.map((line) => (
        <Column line={line} key={line.id} />
      ))}
    </div>
  );
};

export default Storage;
