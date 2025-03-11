'use client';

import React, { createContext, useContext, useRef } from 'react';
import { Box } from '@mui/material';

interface RippleContextType {
  triggerRipple: (x: number, y: number, color: string) => void;
}

const RippleContext = createContext<RippleContextType | null>(null);

export const useRipple = () => {
  const context = useContext(RippleContext);
  if (!context) {
    throw new Error('useRipple must be used within a RippleProvider');
  }
  return context;
};

interface RippleEffectProps {
  children: React.ReactNode;
}

// SVGベースの波紋エフェクトを実装
export default function RippleEffect({ children }: RippleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rippleCountRef = useRef<number>(0);
  const lastTriggerTimeRef = useRef<number>(0);
  // 最大同時波紋数を制限するためのカウンター
  const activeRipplesRef = useRef<number>(0);

  React.useEffect(() => {
    // SVG要素を作成してコンテナに追加
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('style', `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: -10; /* さらに下層に配置 */
    `);
    
    if (containerRef.current) {
      containerRef.current.appendChild(svg);
      svgRef.current = svg;
    }
    
    return () => {
      if (containerRef.current && svgRef.current) {
        containerRef.current.removeChild(svgRef.current);
      }
    };
  }, []);

  const triggerRipple = (x: number, y: number, color: string) => {
    if (!svgRef.current) return;
    
    // スロットリング時間を長く (600ms)
    const now = Date.now();
    if (now - lastTriggerTimeRef.current < 600) return;
    lastTriggerTimeRef.current = now;
    
    // アクティブな波紋数を制限（10まで）
    if (activeRipplesRef.current >= 10) {
      return;
    }
    
    activeRipplesRef.current += 1;
    
    // 固有のIDを生成
    const rippleId = `ripple-${rippleCountRef.current++}`;
    
    // 各波紋に個別のSVG要素を作成
    const rippleSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    rippleSvg.setAttribute('style', `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: -10;
      will-change: transform; /* GPU加速のヒント */
    `);
    
    // 円を描画
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('id', rippleId);
    circle.setAttribute('cx', x.toString());
    circle.setAttribute('cy', y.toString());
    circle.setAttribute('r', '0');
    circle.setAttribute('stroke', color);
    circle.setAttribute('stroke-width', '5'); // 線を太く
    circle.setAttribute('fill', 'none');
    circle.setAttribute('opacity', '0.7');
    
    // アニメーション要素を作成
    const animateRadius = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animateRadius.setAttribute('attributeName', 'r');
    animateRadius.setAttribute('from', '0');
    animateRadius.setAttribute('to', '800'); // 若干小さく
    animateRadius.setAttribute('dur', '1.5s'); // 速度をさらに速く
    animateRadius.setAttribute('begin', '0s');
    animateRadius.setAttribute('fill', 'freeze');
    
    const animateOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animateOpacity.setAttribute('attributeName', 'opacity');
    animateOpacity.setAttribute('from', '0.7');
    animateOpacity.setAttribute('to', '0');
    animateOpacity.setAttribute('dur', '1.5s'); // 消える速度をさらに速く
    animateOpacity.setAttribute('begin', '0s');
    animateOpacity.setAttribute('fill', 'freeze');
    
    // アニメーション要素を円に追加
    circle.appendChild(animateRadius);
    circle.appendChild(animateOpacity);
    
    // 円を個別のSVGに追加
    rippleSvg.appendChild(circle);
    
    // 個別のSVGをコンテナに追加
    if (containerRef.current) {
      containerRef.current.appendChild(rippleSvg);
    }
    
    // アニメーション完了後に要素を削除
    setTimeout(() => {
      if (containerRef.current && rippleSvg.parentNode === containerRef.current) {
        containerRef.current.removeChild(rippleSvg);
        activeRipplesRef.current -= 1; // アクティブ波紋カウントを減らす
      }
    }, 5000); // タイムアウトを短縮
  };

  return (
    <RippleContext.Provider value={{ triggerRipple }}>
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        {children}
      </Box>
    </RippleContext.Provider>
  );
}