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

      // Обновляем масштаб
      transformState.current.scale =
        event.deltaY < 0 ? scale + scaleStep : Math.max(scale - scaleStep, 0.1);

      const scaleFactor = transformState.current.scale / prevScale;
      transformState.current.translateX -= offsetX * (scaleFactor - 1);
      transformState.current.translateY -= offsetY * (scaleFactor - 1);

      applyTransform();
    };

    const handleMouseDown = (event) => {
      if (event.button === 1) {
        // Средняя кнопка
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

    // Добавляем обработчики
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Очистка при размонтировании
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
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
