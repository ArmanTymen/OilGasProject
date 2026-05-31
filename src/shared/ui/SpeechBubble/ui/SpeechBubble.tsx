import type { JSX } from 'react';
import { Html } from '@react-three/drei';
import {
  bubbleStyle,
  tailInnerStyle,
  tailStyle,
} from '../../../../features/scene-director/SceneDirector/lib/SceneDirectorText';

interface SpeechBubbleProps {
  message: string;
  position?: [number, number, number];
}

export const SpeechBubble = ({
  message,
  position = [0, 4.5, 0],
}: SpeechBubbleProps): JSX.Element => {
  return (
    <Html position={position} center distanceFactor={15} zIndexRange={[100, 0]}>
      <div style={bubbleStyle}>
        {message}
        <div style={tailStyle} />
        <div style={tailInnerStyle} />
      </div>
    </Html>
  );
};
