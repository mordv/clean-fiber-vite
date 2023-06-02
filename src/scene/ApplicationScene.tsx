import React, { PropsWithChildren } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MOUSE } from 'three';

const SceneContent: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <OrbitControls
      enableDamping={false}
      mouseButtons={{ LEFT: undefined as never, RIGHT: MOUSE.ROTATE, MIDDLE: MOUSE.PAN }}
    />
    {children}
  </>
);

export const ApplicationScene: React.FC<PropsWithChildren> = ({ children }) => (
  <Canvas
    style={{ background: `#222222` }}
    camera={{ fov: 75, position: [0, 70, 0], near: 10, far: 200, up: [0, 0, 1] }}
  >
    <SceneContent>{children}</SceneContent>
  </Canvas>
);
