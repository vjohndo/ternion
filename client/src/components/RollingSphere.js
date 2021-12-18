import React from "react"
import { useSphere } from "@react-three/cannon"
import { useFrame } from "@react-three/fiber"

export default function RollingSphere() {
    const [ref, api] = useSphere( () => ({
        mass: 10,
        position: [0, 5, 0],
        args: [0.25, 16, 16]
    }))

    
    useFrame(({ mouse, camera }) => {

        if (camera.position.z >= 0) {
            api.applyImpulse([(mouse.x * 0.5), 0, -(mouse.y * 0.5)],[1,1,1]);
        } else {
            api.applyImpulse([-(mouse.x * 0.5), 0, (mouse.y * 0.5)],[1,1,1]);
        }
    });

    return (
        <mesh onclick={() => api.applyImpulse([0,20,0],[1,1,1])} ref={ref} castShadow>
            <sphereBufferGeometry attach="geometry" args={[0.25, 16, 16]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    )
}
