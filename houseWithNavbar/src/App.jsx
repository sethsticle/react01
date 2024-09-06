import './App.css';
import { Canvas } from '@react-three/fiber';
import { PresentationControls, Stage } from '@react-three/drei';
import { useState } from 'react';
import Model from './Model/modelBMW';
import Navbar from './components/Navbar';
import { NavbarData } from './components/NavbarData';
import BoundingBox from './Model/BoundingBox';

const wheelPositions = [
  { id: 'leftWheel', position: [3, -4.3, 5.6] },  // Identifying left wheel
  { id: 'rightWheel', position: [-4.2, -4.3, 5.6] } // Identifying right wheel
];

function App() {
  const [sidebar, setSidebar] = useState(false);
  const [selectedData, setSelectedData] = useState(NavbarData[0]); // Default to first item
  const [activeId, setActiveId] = useState(null); // Track currently active bounding box ID

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleBoundingClick = (id) => {
    let data;
    
    // Determine which NavbarData to use based on the id
    switch (id) {
      case 'leftWheel':
        data = NavbarData[1]; // Left wheel displays NavbarData[1]
        break;
      case 'rightWheel':
        data = NavbarData[0]; // Right wheel displays NavbarData[0]
        break;
      default:
        data = NavbarData[0];
    }

    if (activeId === id) {
      // If the clicked bounding box is the same as the currently active one, toggle the sidebar
      setSidebar(false);
      setActiveId(null); // Reset active ID
    } else {
      // Otherwise, open the sidebar with the new data
      setSelectedData(data);
      setSidebar(true);
      setActiveId(id); // Update active ID
    }
  };

  const drawBoundingBoxes = () => {
    return wheelPositions.map((wheel) => (
      <BoundingBox 
        key={wheel.id} 
        position={wheel.position} 
        onClick={() => handleBoundingClick(wheel.id)}  // Passing unique id for each bounding box
      />
    ));
  };

  return (
    <>
      <button className='tempButton' onClick={toggleSidebar}>Toggle Sidebar</button> 

      <Navbar sidebar={sidebar} toggleSidebar={toggleSidebar} selectedData={selectedData}/>
      
      <Canvas
        style={{ width: '100%', height: '100vh' }}
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}>
        <color attach={"background"} args={["#101010"]} />
        <PresentationControls speed={1.5} global polar={[-0.1, Math.PI / 4]}>
          <Stage environment={"lobby"}>
            <Model />
            {drawBoundingBoxes()}
          </Stage>
        </PresentationControls>
      </Canvas>
    </>
  );
}

export default App;
