import React from "react"
import { useBox } from "@react-three/cannon"

export default function PhysicsBox({position}) {
    const [ref, api] = useBox(() => ({
        mass: 0.1,
        position: position,
        args: [0.5,1,0.5]
    }))

    // const push = () => {
    //     useFrame( ({ camera }) => {

    //         (api.applyImpulse([-camera.position.x, -camera.position.y, -camera.position.z],[1,1,1]))

    //     });
    // }

    
    

    return (
        <mesh ref={ref} position={position}>
            <boxBufferGeometry attach="geometry" args={[0.25, 1, 0.25]}/>
            <meshStandardMaterial color="#333333"/>
        </mesh>
    )
}