// App.js
import './App.css';
import { Suspense, useState } from 'react';
import Navbar from './components/Navbar';
import { NavbarData } from './components/NavbarData';
import { Loader } from '@react-three/drei';
import CanvasComponent from './components/CanvasComponent'; // New component
//import Sidebar from './components/Sidebar'; // Assuming Sidebar is a new component

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [selectedData, setSelectedData] = useState(NavbarData[0]); // Default to first item
  const [activeId, setActiveId] = useState(null); // Track currently active bounding box ID
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setSidebar(!sidebar);

  const handleBoundingClick = (id) => {
    let data;
    
    switch (id) {
      case 'leftWheel':
        data = NavbarData[1];
        break;
      case 'rightWheel':
        data = NavbarData[0];
        break;
      default:
        data = NavbarData[0];
    }

    if (activeId === id) {
      setSidebar(false);
      setActiveId(null);
    } else {
      setSelectedData(data);
      setSidebar(true);
      setActiveId(id);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <Navbar sidebar={sidebar} toggleSidebar={toggleSidebar} selectedData={selectedData}/>
      {/* <Sidebar isOpen={sidebar} data={selectedData} /> */}

      <CanvasComponent 
        onLoadComplete={() => setLoading(false)} 
        onBoundingClick={handleBoundingClick}
      />
    </>
  );
}

export default App;
