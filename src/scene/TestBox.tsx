import React, { useEffect, useRef, useState } from 'react';
import { RoundedBox } from '@react-three/drei';
import { Mesh, Vector3Tuple } from 'three';
import { useFrame } from '@react-three/fiber';
import { useHover } from '@use-gesture/react';
import { setCursor } from '../utils/sceneUtils';

interface TestBoxProps {
  position?: Vector3Tuple;
  color?: string;
  hoveredColor?: string;

  onClick?(): void;
}

export const TestBox: React.VFC<TestBoxProps> = ({ hoveredColor, ...rest }) => {
  const [hovering, setHovering] = useState(false);

  const box = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const boxCurrent = box?.current;
    if (boxCurrent) {
      boxCurrent.rotation.x += delta;
      boxCurrent.rotation.y += delta;
      boxCurrent.rotation.z += delta * Math.random();
      boxCurrent.scale.setScalar(hovering ? 1.1 : 1);
    }
  });

  const bind = useHover(({ hovering }) => setHovering(!!hovering));
  useEffect(() => setCursor(hovering ? `pointer` : `auto`), [hovering]);

  return (
    <RoundedBox ref={box} args={[5, 5, 5]} radius={1} smoothness={4} {...rest} {...(bind() as never)}>
      <meshPhongMaterial color={hovering ? hoveredColor || `red` : `white`} />
    </RoundedBox>
  );
};
