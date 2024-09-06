import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Stage } from '@react-three/drei';
import Model from '../Model/modelBMW';
import BoundingBox from '../Model/BoundingBox';
import { useRef } from 'react';

const wheelPositions = [
  { id: 'leftWheel', position: [3, -4.3, 5.6] },
  { id: 'rightWheel', position: [-4.2, -4.3, 5.6] }
];

const CanvasComponent = ({ onLoadComplete, onBoundingClick }) => {
  const canvasRef = useRef(null);
  const controlsRef = useRef(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      // Ensure OrbitControls is initialized and camera is available
      if (controlsRef.current.camera) {
        // Log current camera position
        console.log('Camera Position:', controlsRef.current.camera.position);

        // Set the camera position to the initial values
        controlsRef.current.camera.position.set(0, 0, 10); // Change these values to your desired initial position
        controlsRef.current.update(); // Update the controls to reflect the new camera position
      } else {
        console.warn('Camera not available in OrbitControls');
      }
    } else {
      console.warn('OrbitControls ref is not set');
    }
  };

  return (
    <>
    <Canvas
      
      style={{ width: '100%', height: '100vh' }}
      dpr={[1, 2]}
      shadows
      camera={{ fov: 45 }}
    >
      <Suspense fallback={null} onLoad={onLoadComplete}>
        <color attach="background" args={["#101010"]} />
        <OrbitControls
          enableZoom={true}      // Enable zooming into the scene
          zoomSpeed={1.5}        // Adjust zoom speed
          enablePan={true}      // Disable panning to prevent shifting the model horizontally
          minPolarAngle={-0.1}   // Prevent the user from rotating under the scene
          maxPolarAngle={Math.PI / 2} // Limit the angle so users can't go below the model
          ref={controlsRef}
        />
        <Stage environment="lobby">
          <Model />
          {wheelPositions.map((wheel) => (
            <BoundingBox
              key={wheel.id}
              position={wheel.position}
              onClick={() => onBoundingClick(wheel.id)} // Handle click events
            />
          ))}
        </Stage>
      </Suspense>
    </Canvas>

      <button className='reset-btn' onClick={handleResetCamera}>
      Reset Camera
      </button>
      </>
  );
};

export default CanvasComponent;
