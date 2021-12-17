import React from "react"
import { useBox } from "@react-three/cannon"

function PhysicsBoxPyramid({position}) {
    const [ref] = useBox(() => ({
        mass: 0.1,
        position: position,
        args: [1,1,1]
    }))

    return (
        <mesh ref={ref} position={position}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshStandardMaterial color="pink"/>
        </mesh>
    )
}

export default function Pyramid() {
    return (
        <>
            <PhysicsBoxPyramid position={[-1.4,-2,-20]}/>
            <PhysicsBoxPyramid position={[0,-2,-20]}/>
            <PhysicsBoxPyramid position={[1.4,-2,-20]}/>
            <PhysicsBoxPyramid position={[-0.7,-1,-20]}/>
            <PhysicsBoxPyramid position={[0.7,-1,-20]}/>
            <PhysicsBoxPyramid position={[0.0,0,-20]}/>
        </>
    )
}