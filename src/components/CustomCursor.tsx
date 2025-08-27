import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  // Check if the device is a touch device
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  // If it's a touch device, don't render the cursor
  if (isTouchDevice) {
    return null;
  }

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        const ease = 0.15;

        currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * ease;
        currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * ease;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${currentPosition.current.x}px, ${currentPosition.current.y}px, 0)`;
        }
        if (cursorDotRef.current) {
          cursorDotRef.current.style.transform = `translate3d(${targetPosition.current.x}px, ${targetPosition.current.y}px, 0)`;
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    const updateCursorPosition = (clientX: number, clientY: number) => {
      targetPosition.current = { x: clientX, y: clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e.clientX, e.clientY);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHovered =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null;

      if (cursorRef.current) {
        cursorRef.current.classList.toggle('hover', isHovered);
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.classList.toggle('hover', isHovered);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', updateHoverState, { passive: true });

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorDotRef} className="custom-cursor-dot" />
    </>
  );
};

export default CustomCursor;