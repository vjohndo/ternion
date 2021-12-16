// import React from "react"


// const JumpingMesh = ({position, args, color, speed}) => {
//     const mesh = useRef(null)
//     useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

//     const [jump, setJump] = useState(position)

//     const props = useSpring({
//         position: jump
//     })
    
//     return (
//         <a.mesh 
//             onClick={() => setJump(position[0]+(Math.random()-0.5)*10,position[1],position[2]+(Math.random()-0.5)*10)} 
//             castShadow 
//             position={props.position} 
//             ref={mesh}>
//             <boxBufferGeometry attach='geometry' args={args} />
//             <MeshWobbleMaterial attach='material' color={color} speed={speed} factor={0.6} />
//         </a.mesh>
//     )
// }