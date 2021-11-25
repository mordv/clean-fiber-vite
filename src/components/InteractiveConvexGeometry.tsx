import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Sphere } from '@react-three/drei';
import { useFancyDrag } from '../utils/sceneUtils';
import { Mesh, Object3D, Vector3, WireframeGeometry } from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { toString } from '../utils/vectorUtils';
import { GroupProps, MeshProps, useFrame } from '@react-three/fiber';
import { intRange } from '../utils/utils';
import { mapRange } from '../utils/mathUtils';

const initialPositions = Array.from({ length: 20 })
  .map(() =>
    intRange(3)
      .map(() => Math.random())
      .map((r) => mapRange(r, [0, 1], [-20, 20]))
  )
  .map(([x, y, z]) => new Vector3(x, y, Math.abs(z)));

export const InteractiveConvexGeometry: React.VFC<GroupProps> = ({ ...rest }) => {
  const groupRef = useRef<Object3D>();
  const convexRef = useRef<Mesh>();
  const wireframeRef = useRef<Mesh>();
  const [points, setPoints] = useState(initialPositions);

  const updateGeometries = useCallback(() => {
    if (convexRef.current && wireframeRef.current && groupRef.current) {
      convexRef.current.geometry.dispose();
      convexRef.current.geometry = new ConvexGeometry(
        groupRef.current.children.map((c) => c.getWorldPosition(new Vector3()))
      );
      wireframeRef.current.geometry.dispose();
      wireframeRef.current.geometry = new WireframeGeometry(convexRef.current?.geometry);
    }
  }, []);

  useEffect(() => {
    updateGeometries();
  }, [points, updateGeometries]);

  return (
    <>
      <group ref={groupRef} {...rest}>
        {points.map((pos, i) => (
          <Point
            key={toString(pos)}
            index={i}
            position={pos}
            onDelete={(index) => setPoints((p) => (p.length > 4 ? p.filter((_, i) => i !== index) : p))}
            onChange={updateGeometries}
          />
        ))}
      </group>
      <mesh ref={convexRef} onClick={({ point, ctrlKey }) => ctrlKey && setPoints((p) => [point, ...p])}>
        <meshBasicMaterial transparent={true} opacity={0.2} color={`#22ff44`} />
      </mesh>
      <lineSegments ref={wireframeRef}>
        <lineBasicMaterial color={`#22ff44`} />
      </lineSegments>
    </>
  );
};

interface PointProps {
  index: number;

  onDelete(index: number): void;
  onChange(): void;
}

const Point: React.VFC<PointProps & MeshProps> = ({ onChange, index, onDelete, ...rest }) => {
  const sphereRef = useRef<Mesh>();
  const [hovered, setHovered] = useState(false);

  useFrame(() => sphereRef.current?.scale.setScalar(hovered ? 1.1 : 1));

  const bind = useFancyDrag(
    ({ point }) => {
      sphereRef.current && sphereRef.current.position.copy(sphereRef.current.parent!.worldToLocal(point));
      onChange();
    },
    (e) => e.altKey && onDelete(index),
    setHovered
  );

  return (
    <Sphere ref={sphereRef} args={[1, 42, 42]} {...rest} {...bind()}>
      <meshBasicMaterial color={hovered ? `#22ff44` : `#229944`} />
    </Sphere>
  );
};
