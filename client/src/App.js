import * as THREE from 'three'
import React, { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react"
import './App.scss';
import Montserrat from "./components/montserrat.json"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber"
import { softShadows, MeshWobbleMaterial, OrbitControls, Text} from "@react-three/drei"
import { useSpring, a } from "@react-spring/three" // Allows animation
import { Physics, usePlane, useSphere, useBox } from "@react-three/cannon"

extend({ TextGeometry })

// function Text({ children, vAlign = 'center', hAlign = 'center', size = 1.5, color = '#000000', ...props }) {
//     const font = useLoader(FontLoader, Montserrat)
//     const config = useMemo(
//       () => ({ font, size: 40, height: 30, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
//       [font]
//     )
//     const mesh = useRef()
//     useLayoutEffect(() => {
//       const size = new THREE.Vector3()
//       mesh.current.geometry.computeBoundingBox()
//       mesh.current.geometry.boundingBox.getSize(size)
//       mesh.current.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
//       mesh.current.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
//     }, [children])
//     return (
//       <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
//         <mesh ref={mesh}>
//           <textGeometry args={[children, config]} />
//           <meshNormalMaterial />
//         </mesh>
//       </group>
//     )
//   }

softShadows();

console.log(Montserrat);

const RollingSphere = () => {
    const [ref, api] = useSphere( () => ({
        mass: 10,
        position: [2, 5, 0]
    }))

    
    useFrame(({ mouse, camera }) => {

        if (camera.position.z >= 0) {
            api.applyImpulse([(mouse.x * 0.5), 0, -(mouse.y * 0.5)],[1,1,1]);
        } else {
            api.applyImpulse([-(mouse.x * 0.5), 0, (mouse.y * 0.5)],[1,1,1]);
        }
    });

    return (
        <mesh ref={ref} castShadow>
            <sphereBufferGeometry attach="geometry" args={[1, 32, 32]}/>
            <meshStandardMaterial color="lightblue"/>
        </mesh>
    )
}

const PhysicsSphere = () => {
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

const PhysicsBox = () => {
    const [ref] = useBox(() => ({
        mass: 10,
        position: [-2, 2, 0],
        args: [0.5,2,0.5]
    }))

    return (
        <mesh ref={ref} castShadow position={[-2, 5, 0]}>
            <boxBufferGeometry attach="geometry" args={[0.5, 2, 0.5]}/>
            <meshStandardMaterial color="white"/>
        </mesh>
    )
}

const Plane = () => {

    const [ref, api] = usePlane(() => ({
        mass: 10,
        position: [0,-3,0],
        rotation: [-Math.PI / 2, 0, 0],
        type: "Static"
    }))

    // useFrame(({ mouse }) => {
    //     api.rotation.set(-Math.PI / 2 - mouse.y * 0.2, 0 + mouse.x * 0.2, 0);
    // });

    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position = {[0, -3, 0]} ref={ref}>
            <planeBufferGeometry attach='geometry' args={[100,100]} />
            <shadowMaterial attach='material' opacity={0.3}/>
        </mesh>
    )
}

const JumpingMesh = ({position, args, color, speed}) => {
    const mesh = useRef(null)
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

    const [jump, setJump] = useState(position)

    const props = useSpring({
        position: jump
    })
    
    return (
        <a.mesh 
            onClick={() => setJump(position[0]+(Math.random()-0.5)*10,position[1],position[2]+(Math.random()-0.5)*10)} 
            castShadow 
            position={props.position} 
            ref={mesh}>
            <boxBufferGeometry attach='geometry' args={args} />
            <MeshWobbleMaterial attach='material' color={color} speed={speed} factor={0.6} />
        </a.mesh>
    )
}



const SpinningMesh = ({position, args, color, speed}) => {
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

function Text3d({position}){
    const font = new FontLoader().parse(Montserrat);
    const textOptions = {
       font: font,
       size: 2,
       height: 0.5
    };

    return (
       <mesh castShadow position={position} rotation={[0.3,0,0]}>
          <textGeometry attach='geometry' args={['Ternion', textOptions]}/>
          <meshStandardMaterial attach='material' color="hotpink" />
        </mesh>
     )
 }

function App() {
    return (
        <>
            <Canvas shadows colorManagement camera={{position: [0,0,10], fov: 60}}>
                <ambientLight intensity={0.3}/>
                <directionalLight
                    castShadow 
                    position={[0, 10, 0]}
                    intensity={1.5}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <pointLight position = {[-10, 0, -20]} intensity={0.5}/>
                <pointLight position = {[0, -10, 0]} intensity={1.5}/>
                {/* <Text hAlign="right" position={[-12, 6.5, 0]} children="THREE" /> */}
                <Text3d position = {[-6.2,12,-20]}/>

                {/* <group>
                    <SpinningMesh position = {[0,1,0]} args={[3,2,1]} color='lightblue' speed={2}/>
                    <SpinningMesh position = {[-2,1,-5]} color="pink" speed={6}/>
                    <SpinningMesh position = {[5,1,-2]} color="pink" speed={6}/>
                    <JumpingMesh position = {[7,-2,-2]} color="purple" speed={6}/>
                </group> */}

                <Physics>
                    {/* <PhysicsSphere/> */}
                    <PhysicsBox/>
                    <RollingSphere/>
                    <Plane/>
                </Physics>

                <OrbitControls />
            </Canvas>
        </>
    );
}

export default App;
