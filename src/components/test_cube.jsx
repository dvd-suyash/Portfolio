import React from 'react';
export function TestCube() {
  return (
    <div style={{ width: 320, height: 320, transformStyle: 'preserve-3d' }}>
      <div style={{ transform: 'rotateY(0deg) translateZ(160px)', position: 'absolute', width: '100%', height: '100%', background: 'red' }}>Front</div>
    </div>
  );
}
