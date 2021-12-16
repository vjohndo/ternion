import React from "react"
import './App.scss';

import { Canvas  } from "@react-three/fiber"
import { OrbitControls, softShadows } from "@react-three/drei"
import { Physics } from "@react-three/cannon"

import Plane from "./components/Plane";
import RollingSphere from "./components/RollingSphere";
import SpinningMesh from "./components/SpinningMesh";
import Text3d from "./components/Text3d";
import RaceTrack from "./components/RaceTrack"

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

                <pointLight position = {[-10, 0, -20]} intensity={0.5}/>
                <pointLight position = {[0, -10, 0]} intensity={1.5}/>

                <Text3d position={[-6.2,12,-20]} text='Ternion'/>
                <group>
                    <SpinningMesh position = {[6.2,13,-19.5]} color="pink" speed={6}/>
                    <SpinningMesh position = {[-8,13,-19.5]} color="pink" speed={6}/>
                </group>
                <Physics>
                    <RaceTrack />
                    <RollingSphere/>
                    <Plane/>
                </Physics>
                <OrbitControls />
            </Canvas>
        </>
    );
}

export default App;
