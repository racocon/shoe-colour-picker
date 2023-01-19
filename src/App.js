import "./index.css";

import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./assets/shoe.gltf");
  return (
    <group ref={group} {...props} dispose={null} scale={3}>
      <mesh
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={props.customColors.stripes}
      />
      <mesh
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={props.customColors.body}
      />
      <mesh
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={"#bdc3c7"}
      />
      <mesh
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={"white"}
      />
      <mesh
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={props.customColors.sole}
      />
      <mesh
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={props.customColors.stripes}
      />
      <mesh
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={"props.customColors.sole"}
      />
      <mesh
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={props.customColors.stripes}
      />
    </group>
  );
}

function App() {
  const [body, setBody] = useState("#ffffff");
  const [stripes, setStripes] = useState("#ffffff");
  const [sole, setSole] = useState("#ffffff");

  const labels = [
    {
      name: "Body",
      type: "body",
      value: body,
      set: setBody,
    },
    {
      name: "Stripes",
      type: "stripes",
      value: stripes,
      set: setStripes,
    },
    {
      name: "Sole",
      type: "sole",
      value: sole,
      set: setSole,
    },
  ];

  return (
    <div className="App">
      <div className="min-h-screen flex items-center justify-around bg-[#34495e]">
        <div className="rounded-md drop-shadow-2xl p-8 bg-[#2c3e50] text-white">
          <div className="h-[50vh] w-[50vw] bg-white drop-shadow-xl mb-5">
            <Canvas>
              <Suspense fallback={null}>
                <ambientLight />
                <spotLight
                  intensity={1}
                  angle={0.2}
                  penumbra={1}
                  position={[10, 100, -5]}
                  castShadow
                />
                <Model
                  customColors={{ body: body, stripes: stripes, sole: sole }}
                />
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                />
              </Suspense>
            </Canvas>
          </div>
          <p className="font-bold text-2xl mb-4 text-center">Colour picker</p>
          <div className="flex flex-row">
            {labels.map((item, index) => {
              return (
                <div key={index} className="flex flex-col mx-auto">
                  <input
                    type="color"
                    id={item.type}
                    name={item.type}
                    value={item.value}
                    onChange={(e) => item.set(e.target.value)}
                  />
                  <label htmlFor={item.type}>{item.name}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
