import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three" 
import { MeshWobbleMaterial } from "@react-three/drei"

export default function SpinningMesh({position, args, color, speed}) {
    const mesh = useRef(null) // Need to be able to get reference to null mesh
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01)); // Use frame can't be used in the app component 

    const [expand, setExpand] = useState(false);

    const props = useSpring({
        scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
    });

    return (
        <a.mesh onClick={() => setExpand(!expand)} scale={props.scale} castShadow position={position} ref={mesh}>
            <boxBufferGeometry attach='geometry' args={args} />
            <MeshWobbleMaterial attach='material' color={color} speed={speed} factor={0.6} />
        </a.mesh>
    )
}