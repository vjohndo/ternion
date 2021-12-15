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

// softShadows();

console.log(Montserrat);

const RollingSphere = () => {
    const [ref, api] = useSphere( () => ({
        mass: 10,
        position: [0, 5, 0],
        args: [0.25, 16, 16]
    }))

    
    useFrame(({ mouse, camera }) => {

        if (camera.position.z >= 0) {
            api.applyImpulse([(mouse.x * 1), 0, -(mouse.y * 1)],[1,1,1]);
        } else {
            api.applyImpulse([-(mouse.x * 1), 0, (mouse.y * 1)],[1,1,1]);
        }
    });

    return (
        <mesh ref={ref} castShadow>
            <sphereBufferGeometry attach="geometry" args={[0.25, 16, 16]}/>
            <meshStandardMaterial color="red"/>
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

const PhysicsBox = ({position}) => {
    const [ref] = useBox(() => ({
        mass: 0.1,
        position: position,
        args: [0.5,1,0.5]
    }))

    return (
        <mesh ref={ref} position={position}>
            <boxBufferGeometry attach="geometry" args={[0.25, 1, 0.25]}/>
            <meshStandardMaterial color="black"/>
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
       <mesh onClick={() => window.location.reload()} castShadow position={position} rotation={[0.3,0,0]}>
          <textGeometry attach='geometry' args={['Ternion', textOptions]}/>
          <meshStandardMaterial attach='material' color="hotpink" />
        </mesh>
     )
 }

const lightCoords = [
    [-35.10,-4.54],
    [-15.31,2.71],
    [-5.26,16.14],
    [15.92,-17.87],
    [34.92,-19.58],
]


const trackCoords = [
    [-35.10,-4.54],
    [-34.69,-2.65],
    [-34.60,-6.32],
    [-34.16,-0.79],
    [-33.74,-8.05],
    [-33.60,1.06],
    [-33.04,2.91],
    [-32.48,4.76],
    [-32.21,-3.64],
    [-31.83,-8.35],
    [-31.64,-1.56],
    [-31.43,6.30],
    [-31.02,0.50],
    [-30.39,2.56],
    [-30.01,7.61],
    [-29.92,-8.65],
    [-29.86,-5.99],
    [-29.53,4.47],
    [-28.59,8.93],
    [-28.01,-8.96],
    [-27.95,5.93],
    [-27.74,-6.33],
    [-27.17,10.24],
    [-26.37,7.39],
    [-26.10,-9.26],
    [-25.61,-6.67],
    [-25.42,10.71],
    [-24.58,7.72],
    [-24.19,-9.56],
    [-23.63,10.22],
    [-23.48,-7.01],
    [-22.74,6.61],
    [-22.28,-9.87],
    [-21.97,9.23],
    [-21.36,-7.35],
    [-20.89,5.51],
    [-20.37,-10.17],
    [-20.31,8.23],
    [-19.23,-7.68],
    [-19.05,4.40],
    [-18.65,7.24],
    [-18.46,-10.48],
    [-17.20,3.29],
    [-17.10,-7.91],
    [-16.99,6.24],
    [-16.54,-10.53],
    [-15.95,-6.40],
    [-15.45,-4.31],
    [-15.37,5.95],
    [-15.31,2.71],
    [-14.94,-2.21],
    [-14.72,-9.98],
    [-14.35,7.49],
    [-14.13,-0.25],
    [-13.73,9.32],
    [-13.71,-8.34],
    [-13.58,4.00],
    [-13.26,-6.46],
    [-13.11,11.16],
    [-12.81,-4.58],
    [-12.77,1.40],
    [-12.49,12.99],
    [-12.34,-2.70],
    [-12.23,5.56],
    [-11.87,14.82],
    [-11.54,7.59],
    [-11.40,-1.05],
    [-10.91,2.49],
    [-10.84,9.63],
    [-10.77,16.24],
    [-10.15,11.67],
    [-9.82,-0.02],
    [-9.46,13.71],
    [-9.01,16.93],
    [-8.78,2.79],
    [-7.90,0.25],
    [-7.63,14.10],
    [-7.11,16.70],
    [-6.68,2.68],
    [-6.11,-0.39],
    [-5.57,13.47],
    [-5.26,16.14],
    [-4.77,-1.74],
    [-4.72,1.85],
    [-4.21,-10.87],
    [-4.15,-9.20],
    [-4.15,-3.55],
    [-3.81,-5.44],
    [-3.65,-7.37],
    [-3.58,12.67],
    [-3.44,15.51],
    [-3.07,0.50],
    [-2.83,-12.22],
    [-2.01,-1.35],
    [-1.73,11.58],
    [-1.71,14.65],
    [-1.53,-9.74],
    [-1.45,-3.43],
    [-1.22,-13.24],
    [-1.15,-5.55],
    [-0.98,-7.70],
    [-0.07,13.63],
    [-0.04,10.23],
    [0.15,-10.96],
    [0.55,-14.01],
    [1.44,12.42],
    [1.54,8.79],
    [2.12,-11.82],
    [2.32,-14.79],
    [2.92,11.17],
    [3.01,7.21],
    [4.09,-15.56],
    [4.09,-12.69],
    [4.24,9.76],
    [4.35,5.54],
    [5.56,8.35],
    [5.62,3.79],
    [5.86,-16.34],
    [6.06,-13.55],
    [6.70,6.79],
    [6.88,2.05],
    [7.63,-17.12],
    [7.84,5.23],
    [7.91,0.17],
    [8.03,-14.41],
    [8.88,-1.76],
    [8.97,3.66],
    [9.40,-17.89],
    [9.84,-3.68],
    [9.94,1.99],
    [10.00,-15.28],
    [10.81,-5.60],
    [10.81,0.27],
    [11.17,-18.67],
    [11.68,-1.46],
    [11.90,-7.44],
    [11.97,-16.14],
    [12.55,-3.19],
    [12.94,-19.44],
    [13.31,-9.06],
    [13.42,-4.91],
    [13.95,-17.00],
    [14.54,-6.47],
    [14.71,-20.22],
    [14.94,-10.47],
    [15.89,-7.85],
    [15.92,-17.87],
    [16.48,-20.99],
    [16.80,-11.52],
    [17.48,-8.93],
    [17.89,-18.73],
    [18.25,-21.77],
    [18.51,-15.89],
    [18.76,-12.40],
    [19.23,-9.74],
    [19.34,-13.90],
    [19.64,-17.47],
    [19.86,-19.59],
    [20.03,-22.52],
    [21.02,-10.48],
    [21.62,-15.30],
    [21.63,-18.12],
    [21.90,-20.24],
    [21.92,-22.94],
    [22.28,-11.57],
    [22.28,-13.50],
    [23.24,-15.27],
    [23.75,-17.88],
    [23.85,-22.98],
    [24.04,-20.32],
    [24.39,-14.21],
    [24.66,-12.34],
    [25.62,-10.73],
    [25.72,-22.57],
    [25.79,-17.20],
    [26.10,-19.68],
    [27.02,-14.21],
    [27.46,-10.13],
    [27.51,-16.30],
    [27.56,-21.98],
    [28.09,-12.70],
    [28.14,-19.02],
    [29.29,-9.52],
    [29.40,-21.38],
    [30.13,-12.02],
    [30.19,-18.35],
    [31.13,-8.92],
    [31.24,-20.78],
    [32.17,-11.35],
    [32.23,-17.68],
    [32.97,-8.31],
    [33.08,-20.18],
    [34.22,-10.68],
    [34.28,-17.02],
    [34.80,-7.71],
    [34.92,-19.58],
    [36.26,-10.00],
    [36.33,-16.35],
    [36.64,-7.10],
    [36.76,-18.98],
    [38.31,-9.33],
    [38.37,-15.68],
    [38.48,-6.50],
    [38.59,-18.39],
    [40.35,-6.12],
    [40.37,-8.76],
    [40.42,-15.02],
    [40.43,-17.79],
    [41.38,-10.63],
    [42.13,-6.36],
    [42.27,-17.19],
    [42.37,-12.54],
    [42.47,-14.35],
    [43.02,-8.08],
    [43.91,-9.80],
    [44.10,-16.57],
    [44.80,-11.51],
    [45.41,-15.15],
    [45.54,-13.27]
  ]



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
                    shadow-camera-left={-50}
                    shadow-camera-right={50}
                    shadow-camera-top={50}
                    shadow-camera-bottom={-50}
                /> 
               

                {/* <pointLight position = {[-10, 0, -20]} intensity={0.5}/>
                <pointLight position = {[0, -10, 0]} intensity={1.5}/> */}
                {/* <Text hAlign="right" position={[-12, 6.5, 0]} children="THREE" /> */}
                <Text3d position = {[-6.2,12,-20]}/>

                <group>
                    <SpinningMesh position = {[0,1,0]} args={[3,2,1]} color='lightblue' speed={2}/>
                    <SpinningMesh position = {[-2,1,-5]} color="pink" speed={6}/>
                    <SpinningMesh position = {[5,1,-2]} color="pink" speed={6}/>
                    <JumpingMesh position = {[7,-2,-2]} color="purple" speed={6}/>
                </group>

                <Physics>
                    {/* <PhysicsSphere/> */}
                    {
                        trackCoords.map((coords) => {
                            return <PhysicsBox position={[coords[0]+3, -2, coords[1]+2]}/>
                        })
                    }
                    <RollingSphere/>
                    <Plane/>
                </Physics>

                <OrbitControls />
            </Canvas>
        </>
    );
}

export default App;
