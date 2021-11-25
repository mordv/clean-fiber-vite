import React from 'react';
import { ApplicationScene } from '../scene/ApplicationScene';
import { Counter } from '../components/Counter';
import { InteractiveConvexGeometry } from '../components/InteractiveConvexGeometry';

export const HomePage: React.VFC = () => (
  <ApplicationScene>
    <Counter position={[0, 0, -10]} />
    <InteractiveConvexGeometry position={[0, 0, 10]} />
  </ApplicationScene>
);
