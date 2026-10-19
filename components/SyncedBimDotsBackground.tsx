import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface SyncedBimDotsBackgroundProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  interactive?: boolean;
}

interface NodePoint {
  x: number;
  y: number;
  radius: number;
  color: string;
  isAnchor: boolean;
  tag?: string;
  speed: number;
  alpha: number;
}

export const SyncedBimDotsBackground: React.FC<SyncedBimDotsBackgroundProps> = ({
  className = '',
  density = 'medium',
  interactive = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; active: boolean }>({
    x: null,
    y: null,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const count = density === 'high' ? 44 : density === 'low' ? 22 : 32;
    const maxDistance = 140; // line connection threshold
    let nodes: NodePoint[] = [];

    // Technical tags for architectural BIM point cloud feel (White & Blue only)
    const tags = ['LOD 350', 'COORD-X', '0-CLASH', 'ISO 19650', 'AXIS A', 'MEP-OK', 'GRID 04', 'ELEV +14m'];

    const initNodes = (w: number, h: number) => {
      const cols = Math.ceil(Math.sqrt(count * (w / Math.max(h, 1))));
      const rows = Math.ceil(count / cols);
      const cellW = w / cols;
      const cellH = h / rows;

      const newNodes: NodePoint[] = [];
      let idx = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (newNodes.length >= count) break;

          const x = c * cellW + cellW * 0.5 + (Math.random() - 0.5) * cellW * 0.4;
          const y = r * cellH + cellH * 0.5 + (Math.random() - 0.5) * cellH * 0.4;

          const isAnchor = idx % 4 === 0;
          const isSkyBlue = idx % 3 === 0;
          const color = isAnchor ? '#1D4ED8' : isSkyBlue ? '#0284C7' : '#2563EB';

          newNodes.push({
            x,
            y,
            radius: isAnchor ? 3.5 : 2.4,
            color,
            isAnchor,
            tag: isAnchor && idx % 3 === 0 ? tags[idx % tags.length] : undefined,
            speed: 14 + (idx % 4) * 2.5, // Steady individual left-to-right speeds (px/sec)
            alpha: 1,
          });

          idx++;
        }
      }
      return newNodes;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const prevWidth = width;
      const prevHeight = height;

      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      if (nodes.length === 0) {
        nodes = initNodes(width, height);
      } else if (prevWidth > 0 && prevHeight > 0) {
        // Rescale existing node coordinates to prevent sudden reset or jumps on resize
        const scaleX = width / prevWidth;
        const scaleY = height / prevHeight;
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].x *= scaleX;
          nodes[i].y *= scaleY;
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking for subtle interactive magnetism
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.08); // Clamped delta time in seconds
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const fadeMargin = 50;

      // 1. Smooth, continuous horizontal translation strictly from left to right
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!shouldReduceMotion) {
          node.x += node.speed * dt;
          if (node.x > width + 40) {
            node.x = -40;
          }
        }

        // Smooth boundary fade calculation prevents flickering when wrapping
        const leftFade = Math.min(1, Math.max(0, (node.x + 40) / fadeMargin));
        const rightFade = Math.min(1, Math.max(0, (width + 40 - node.x) / fadeMargin));
        node.alpha = leftFade * rightFade;
      }

      // 2. Draw Synchronized Interconnecting Mesh Lines (With edge-fade to prevent line pops)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const baseAlpha = (1 - dist / maxDistance) * 0.32;
            const lineAlpha = baseAlpha * n1.alpha * n2.alpha;

            if (lineAlpha > 0.02) {
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha})`;
              ctx.lineWidth = dist < maxDistance * 0.5 ? 0.9 : 0.55;
              ctx.stroke();
            }
          }
        }
      }

      // 3. Connect to Mouse if in range
      if (mouseRef.current.active && mouseRef.current.x !== null && mouseRef.current.y !== null) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const dx = node.x - mx;
          const dy = node.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            const alpha = (1 - dist / 125) * 0.35 * node.alpha;
            if (alpha > 0.02) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(mx, my);
              ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }
      }

      // 4. Draw Synchronized Moving Dots & Technical Annotations
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.alpha < 0.02) continue;

        ctx.globalAlpha = node.alpha;

        // Draw steady engineering halo on anchor nodes
        if (node.isAnchor) {
          const haloRadius = node.radius + 3.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, haloRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(37, 99, 235, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw the dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.isAnchor ? 5 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw technical tag annotation if present
        if (node.tag) {
          ctx.font = '9px monospace';
          ctx.fillStyle = 'rgba(37, 99, 235, 0.85)';
          ctx.fillText(node.tag, node.x + 8, node.y - 6);
        }
      }

      ctx.globalAlpha = 1.0;

      if (!shouldReduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (shouldReduceMotion) {
      // Single static render for reduced motion
      render(performance.now());
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [density, interactive, shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};
