import { useRef, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";


const Model = forwardRef((props, ref) => {

  const { scene } = useGLTF("/bmwRender.glb");
  // Adjust model position if necessary
    scene.position.set(0, -5.8, 0);

    return (
      <group ref={ref} {...props} >
      <primitive object={scene} />
      </group>
    );
})

 
export default Model;
