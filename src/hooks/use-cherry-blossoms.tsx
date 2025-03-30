import { useRef, useEffect } from 'react';

interface CherryBlossomConfig {
  numPetals?: number;
  petalSize?: number;
  fallSpeed?: number;
  swayFactor?: number;
  colors?: string[];
  container?: string; // Optional CSS selector for container
}

export function useCherryBlossoms({
  numPetals = 30,
  petalSize = 15,
  fallSpeed = 2,
  swayFactor = 2,
  colors = ['#ffccff', '#f7c6ef', '#ffc6e7', '#ffe1eb', '#ffdbdb'],
  container
}: CherryBlossomConfig = {}) {
  const petalsRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerElement = containerRef.current;
    const containerWidth = containerElement.offsetWidth;
    const containerHeight = containerElement.offsetHeight;

    // Create petals
    petalsRef.current = [];
    for (let i = 0; i < numPetals; i++) {
      createPetal(containerElement, containerWidth, containerHeight);
    }

    // Animation loop
    function animate() {
      petalsRef.current.forEach(petal => {
        const speed = parseFloat(petal.dataset.speed || '1');
        const sway = parseFloat(petal.dataset.sway || '1');
        const rotate = parseFloat(petal.dataset.rotate || '0');
        
        // Update position
        let top = parseFloat(petal.style.top || '0') + speed;
        let left = parseFloat(petal.style.left || '0') + Math.sin(top / 50) * sway;
        
        // Reset if out of view
        if (top > containerHeight) {
          top = -petalSize;
          left = Math.random() * containerWidth;
        }
        
        // Apply new position
        petal.style.top = `${top}px`;
        petal.style.left = `${left}px`;
        petal.style.transform = `rotate(${rotate + 0.2}deg)`;
        petal.dataset.rotate = (rotate + 0.2).toString();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Clean up
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      petalsRef.current.forEach(petal => {
        if (petal.parentNode) {
          petal.parentNode.removeChild(petal);
        }
      });
    };
  }, [numPetals, petalSize, fallSpeed, swayFactor, colors, container]);

  function createPetal(containerElement: HTMLDivElement, containerWidth: number, containerHeight: number) {
    const petal = document.createElement('div');
    petal.className = 'cherry-petal';
    
    // Random position
    const left = Math.random() * containerWidth;
    const top = Math.random() * containerHeight - containerHeight; // Start above viewport
    
    // Random appearance
    const size = petalSize - 5 + Math.random() * 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const rotation = Math.random() * 360;
    
    // Random motion parameters
    const speed = fallSpeed * (0.5 + Math.random());
    const sway = swayFactor * (0.5 + Math.random());
    
    // Set styles
    Object.assign(petal.style, {
      position: 'absolute',
      backgroundColor: color,
      width: `${size}px`,
      height: `${size * 0.8}px`,
      borderRadius: '50% 50% 50% 0',
      top: `${top}px`,
      left: `${left}px`,
      transform: `rotate(${rotation}deg)`,
      opacity: 0.7 + Math.random() * 0.3,
      zIndex: '1',
      pointerEvents: 'none',
      boxShadow: `0 0 2px ${color}`,
    });
    
    // Store motion parameters
    petal.dataset.speed = speed.toString();
    petal.dataset.sway = sway.toString();
    petal.dataset.rotate = rotation.toString();
    
    containerElement.appendChild(petal);
    petalsRef.current.push(petal);
  }

  // Return ref to be attached to container element
  return containerRef;
}