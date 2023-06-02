import { useEffect, useRef } from 'react';
import { Plane, Vector3 } from 'three';
import { useGesture, Vector2 } from '@use-gesture/react';
import { buttonsParser } from './buttonsParser';
import { ThreeEvent } from '@react-three/fiber';

export const setCursor = (cursor: 'pointer' | 'auto' = `auto`): void => void (document.body.style.cursor = cursor);

export const useCursor = (pointer?: boolean): void =>
  useEffect(() => void (document.body.style.cursor = pointer ? `pointer` : `auto`), [pointer]);

interface DragData {
  point: Vector3;
  last?: boolean;
}

export const useFancyDrag = (
  onDrag: (dragData: DragData) => void,
  onClick: (event: ThreeEvent<PointerEvent>) => void,
  onHover?: (hovered: boolean) => void,
  enabled = true
): ReturnType<typeof useGesture> => {
  const planeRef = useRef(new Plane());

  return useGesture(
    {
      onDrag: ({ first, last, event }) => {
        event.stopPropagation();
        const e = event as any as ThreeEvent<PointerEvent>;
        const { ray, object, camera, buttons } = e;
        const position = object.getWorldPosition(new Vector3());
        if (buttonsParser(buttons).primary) {
          if (first) {
            const normal = new Vector3(0, 0, -1).unproject(camera).normalize();
            planeRef.current?.setFromNormalAndCoplanarPoint(normal, position);
            onClick(e);
            // onDrag({ point: position });
          } else {
            const point = ray.intersectPlane(planeRef.current, new Vector3());
            if (point) {
              onDrag({
                point,
                last,
              });
            }
          }
        }
      },
      onHover: ({ hovering }) => onHover?.(!!hovering),
    },
    { enabled }
  );
};

export const gestureCoordinatesTransformer =
  (domElement: Element): ((v: Vector2) => Vector2) =>
  ([x, y]: Vector2) => {
    const { x: boundingX, y: boundingY, width, height } = domElement.getBoundingClientRect();
    return [((x - boundingX) / width) * 2 - 1, -(((y - boundingY) / height) * 2 - 1)];
  };
