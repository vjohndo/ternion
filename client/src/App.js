import React, { useEffect } from "react"
import './App.scss';

import { Canvas  } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Physics } from "@react-three/cannon"

import Plane from "./components/Plane";
import RollingSphere from "./components/RollingSphere";
import SpinningMesh from "./components/SpinningMesh";
import Text3d from "./components/Text3d";
import RaceTrack from "./components/RaceTrack"
import PhysicsPyramid from "./components/PhysicsPyramid"



function App() {

    useEffect(() => {
        document.title = "Ternion";  
    }, []);

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
                <Text3d position={[-6.2,13,-20]} text='Ternion' size={2}/>
                <Text3d position={[-8.5,11,-20]} text='Mouse controls ball (relative to screen centre)' size={0.5}/>
                <Text3d position={[-4.5,10.2,-20]} text='Hold left-click to rotate' size={0.5}/>
                <Text3d position={[-4.4,9.4,-20]} text='Hold right-click to pan' size={0.5}/>
                <Text3d position={[-4.2,8.6,-20]} text='Scroll wheel to zoom' size={0.5}/>
                <Text3d position={[-5.9,7.8,-20]} text='Click on spinny cubes to inflate' size={0.5}/>
                <Text3d position={[-4.7,7,-20]} text='Click on Ternion to reset' size={0.5}/>

                <SpinningMesh position = {[6.2,14,-19.5]} color="purple" speed={6}/>
                <SpinningMesh position = {[-8,14,-19.5]} color="purple" speed={-6}/>

                <Physics>
                    <RaceTrack />
                    <RollingSphere/>
                    <PhysicsPyramid/>
                    <Plane/>
                </Physics>

                <OrbitControls />
            </Canvas>
        </>
    );
}

export default App;
