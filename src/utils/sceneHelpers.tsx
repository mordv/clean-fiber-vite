import { DoubleSide, Mesh, MeshBasicMaterial, Object3D, SphereBufferGeometry, Vector3, Vector3Tuple } from 'three';
import { convertOrClone } from './vectorUtils';
import React from 'react';
import { Sphere } from '@react-three/drei';

export interface PointHelperConfig {
  color?: string;
  radius?: number;
  id?: string;
}

let lastId = `id`;
let prevMeshes: Mesh[] = [];
export const createPointHelper = (
  point: Vector3 | Vector3Tuple,
  attachTo: Object3D,
  { color = `red`, radius = 0.2, id = Math.random().toString() }: PointHelperConfig = {}
): void => {
  const m = new Mesh(new SphereBufferGeometry(radius, 42, 42), new MeshBasicMaterial({ color }));
  m.position.copy(convertOrClone(point));
  if (id !== lastId) {
    attachTo.remove(...prevMeshes);
    prevMeshes = [];
    lastId = id;
  }
  prevMeshes.push(m);
  attachTo.add(m);
};

export const replace = (object: Object3D, attachTo: Object3D, name = `replaceableObjectName`): void => {
  attachTo.getObjectByName(name)?.removeFromParent();
  object.name = name;
  attachTo.add(object);
};

type PointHelperProps = Pick<PointHelperConfig, 'radius' | 'color'> & { point: Vector3 | Vector3Tuple };
export const PointHelper: React.VFC<PointHelperProps> = ({ radius, color }) => (
  <Sphere args={[radius, 42, 42]}>
    <meshBasicMaterial color={color} />
  </Sphere>
);

export const createDoubleSideMaterial = (color = `red`): MeshBasicMaterial =>
  new MeshBasicMaterial({ side: DoubleSide, color });
