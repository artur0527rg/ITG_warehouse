const scalableElement = document.getElementById('storage-container');

    // Переменные для масштабирования
    let scale = 1;

    // Переменные для панорамирования
    let isDragging = false;
    let startX, startY;
    let translateX = 0, translateY = 0;

    // Масштабирование с колесиком мыши
    document.addEventListener('wheel', (event) => {
      event.preventDefault(); // Отключаем стандартную прокрутку страницы

      // Получаем текущую позицию мыши относительно окна
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Координаты элемента
      const rect = scalableElement.getBoundingClientRect();

      // Положение мыши относительно элемента
      const offsetX = mouseX - rect.left;
      const offsetY = mouseY - rect.top;

      // Изменение масштаба
      const scaleStep = 0.1; // Шаг изменения масштаба
      const prevScale = scale;
      if (event.deltaY < 0) {
        scale += scaleStep; // Увеличение
      } else {
        scale = Math.max(scale - scaleStep, 0.1); // Уменьшение, но не меньше 0.1
      }

      // Коэффициент изменения масштаба
      const scaleFactor = scale / prevScale;

      // Корректируем позицию элемента так, чтобы точка под мышью оставалась на месте
      translateX -= offsetX * (scaleFactor - 1);
      translateY -= offsetY * (scaleFactor - 1);

      // Применяем масштабирование и сдвиг
      scalableElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    },
    { passive: false }
    );

    // Начало перетаскивания с помощью средней кнопки мыши
    document.addEventListener('mousedown', (event) => {
      if (event.button === 1) { // Проверяем, что нажата средняя кнопка мыши
        isDragging = true;
        startX = event.clientX - translateX;
        startY = event.clientY - translateY;
        event.preventDefault(); // Предотвращаем стандартное поведение средней кнопки мыши
      }
    });

    // Перемещение элемента при движении мыши
    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        translateX = event.clientX - startX;
        translateY = event.clientY - startY;
        scalableElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      }
    });

    // Окончание перетаскивания
    document.addEventListener('mouseup', (event) => {
      if (event.button === 1) { // Проверяем, что отпущена средняя кнопка мыши
        isDragging = false;
      }
    });