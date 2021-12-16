import React from "react";
import { extend } from "@react-three/fiber";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import Montserrat from "../assets/montserrat.json"

extend({ TextGeometry })

export default function Text3d({position, text}){
    const font = new FontLoader().parse(Montserrat);
    const textOptions = {
       font: font,
       size: 2,
       height: 0.5
    };

    return (
       <mesh onClick={() => window.location.reload()} castShadow position={position} rotation={[0.3,0,0]}>
          <textGeometry attach='geometry' args={[text, textOptions]}/>
          <meshStandardMaterial attach='material' color="hotpink" />
        </mesh>
     )
 }