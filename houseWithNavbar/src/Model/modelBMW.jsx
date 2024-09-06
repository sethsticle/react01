import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/bmwRender.glb");
  const modelRef = useRef();

  // Adjust model position if necessary
  scene.position.set(0, -5.8, 0);

  return (
    <primitive object={scene} ref={modelRef} />
  );
}

export default Model;
