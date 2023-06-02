import React from 'react';
import { AppState, useAppStore } from '../state/state';
import { shallow } from 'zustand/shallow';
import { Text } from '@react-three/drei';
import { TestBox } from '../scene/TestBox';
import { GroupProps } from '@react-three/fiber';

const selector = ({ dec, inc, counter }: AppState) => ({ dec, inc, counter });

export const Counter: React.FC<GroupProps> = ({ ...rest }) => {
  const { counter, inc, dec } = useAppStore(selector, shallow);

  return (
    <group {...rest}>
      <TestBox onClick={dec} position={[10, 0, 0]} hoveredColor={`#ff1111`} />
      <Text fontSize={5} rotation={[Math.PI / 2, Math.PI, 0]}>
        {counter}
      </Text>
      <TestBox onClick={inc} position={[-10, 0, 0]} hoveredColor={`#11ff11`} />
    </group>
  );
};
