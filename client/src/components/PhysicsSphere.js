import React from "react"
import { useSphere } from "@react-three/cannon"

export default function PhysicsSphere() {
    const [ref] = useSphere( () => ({
        mass: 10,
        position: [2, 5, 0]
    }))

    return (
        <mesh ref={ref} castShadow>
            <sphereBufferGeometry attach="geometry" args={[1, 32, 32]}/>
            <meshStandardMaterial color="lightBlue"/>
        </mesh>
    )
}