import { Spherical, Vector3, Vector3Tuple } from 'three';

export const defaultVectors = Object.freeze({
  up: () => new Vector3(0, 1, 0),
  down: () => new Vector3(0, -1, 0),
  right: () => new Vector3(1, 0, 0),
  left: () => new Vector3(-1, 0, 0),
  forward: () => new Vector3(0, 0, 1),
  backward: () => new Vector3(0, 0, -1),
  zero: () => new Vector3(),
});

export const convertOrClone = (medialPoint: Vector3 | Vector3Tuple): Vector3 =>
  medialPoint instanceof Vector3 ? medialPoint.clone() : new Vector3(...medialPoint);

export const findMiddlePoint = (firstPoint: Vector3 | Vector3Tuple, secondPoint: Vector3 | Vector3Tuple): Vector3 =>
  convertOrClone(firstPoint).sub(convertOrClone(secondPoint)).multiplyScalar(0.5).add(convertOrClone(secondPoint));

export const calculateRotationCenter = (
  medialPoint: Vector3 | Vector3Tuple,
  distalPoint: Vector3 | Vector3Tuple
): Vector3 =>
  findMiddlePoint(medialPoint, distalPoint).add(
    defaultVectors
      .right()
      .cross(convertOrClone(medialPoint).sub(convertOrClone(distalPoint)))
      .normalize()
      .multiplyScalar(10)
  );

export const direction = (from: Vector3Tuple | Vector3, to: Vector3Tuple | Vector3): Vector3 =>
  convertOrClone(to).sub(convertOrClone(from));

export const equals = (v1?: Vector3, v2?: Vector3, epsilon = 0.000001): boolean =>
  v1 && v2
    ? Math.abs(v1.x - v2.x) < epsilon && Math.abs(v1.y - v2.y) < epsilon && Math.abs(v1.z - v2.z) < epsilon
    : false;

export const near = (v1?: Vector3, v2?: Vector3, delta = 0.1): boolean => equals(v1, v2, delta);

export const codirectional = (v1: Vector3, v2: Vector3): boolean =>
  equals(v1.clone().normalize(), v2.clone().normalize());

export type SphericalCoords = Vector3Tuple;
const tmp = new Spherical();
export const toSphericalCoords = (vector: Vector3): SphericalCoords => {
  const { radius, phi, theta } = tmp.setFromVector3(vector);
  return [radius, phi, theta];
};

export const vectorToString = ({ x, y, z }: Vector3): string => `${x.toFixed(3)}${y.toFixed(3)}${z.toFixed(3)}`;

export const toString = ({ x, y, z }: Vector3) => `${x.toFixed(3)}${y.toFixed(3)}${z.toFixed(3)}`;
