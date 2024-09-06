import { Box } from '@react-three/drei';
import { BoxGeometry, EdgesGeometry, LineSegments, LineBasicMaterial } from 'three';
import { useState } from 'react';

function BoundingBox({ position, onClick }) {
    const [visible, setVisible] = useState(true);
    const boxSize = [1, 2.5, 2.5]; 
  
    const handleClick = (event) => {
      console.log('BB: Bounding Box Clicked');
      if (onClick) onClick(position); // Ensure onClick is called correctly
    };
  
    return (
      <group position={position}>
        <Box
          args={boxSize}
          onClick={handleClick}
          onPointerOver={() => setVisible(true)}
          onPointerOut={() => setVisible(false)}
        >
          <meshBasicMaterial color="blue" transparent opacity={0.2} />
        </Box>
  
        {visible && (
          <lineSegments>
            <edgesGeometry args={[new BoxGeometry(...boxSize)]} />
            <lineBasicMaterial color="red" />
          </lineSegments>
        )}
      </group>
    );
  }
  

export default BoundingBox;
