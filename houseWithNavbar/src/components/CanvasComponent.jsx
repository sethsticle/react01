// CanvasComponent.js
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { PresentationControls, Stage } from '@react-three/drei';
import Model from '../Model/modelBMW'
import BoundingBox from '../Model/BoundingBox';
//import wheelPositions from './data/wheelPositions'; // Assuming you have wheelPositions data

const wheelPositions = [
  { id: 'leftWheel', position: [3, -4.3, 5.6] },  // Identifying left wheel
  { id: 'rightWheel', position: [-4.2, -4.3, 5.6] } // Identifying right wheel
];

const CanvasComponent = ({ onLoadComplete, onBoundingClick }) => {
  return (
    <Canvas
      style={{ width: '100%', height: '100vh' }}
      dpr={[1, 2]}
      shadows
      camera={{ fov: 45 }}>
      <Suspense fallback={null} onLoad={onLoadComplete}>
        <color attach="background" args={["#101010"]} />
        <PresentationControls speed={1.5} global polar={[-0.1, Math.PI / 4]}>
          <Stage environment="lobby">
            <Model />
            {wheelPositions.map((wheel) => (
              <BoundingBox 
                key={wheel.id} 
                position={wheel.position} 
                onClick={() => onBoundingClick(wheel.id)}
              />
            ))}
          </Stage>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
};

export default CanvasComponent;
