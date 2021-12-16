import React from "react"
import { usePlane } from "@react-three/cannon"

export default function Plane() {
    const [ref] = usePlane(() => ({
        mass: 10,
        position: [0,-3,0],
        rotation: [-Math.PI / 2, 0, 0],
        type: "Static"
    }))

    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position = {[0, -3, 0]} ref={ref}>
            <planeBufferGeometry attach='geometry' args={[100,100]} />
            <shadowMaterial attach='material' opacity={0.3}/>
        </mesh>
    );
}