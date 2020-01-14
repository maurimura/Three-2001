import * as THREE from 'three'
import { render } from 'react-dom'
import React, { useEffect, useRef, useMemo } from 'react'
import { Canvas, useThree, useFrame, extend } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { AdditiveBlendingShader, VolumetricLightShader } from './shaders'
import './styles.css'

extend({ EffectComposer, RenderPass, ShaderPass })

const OCCLUSION_LAYER = 1

function Effects() {
  const { gl, scene, camera, size } = useThree()
  const occlusionRenderTarget = useMemo(() => new THREE.WebGLRenderTarget(0, 0), [])
  const occlusionComposer = useRef()
  const composer = useRef()
  const light = useRef<THREE.Object3D>()

  useEffect(() => {
    occlusionComposer.current.setSize(size.width, size.height)
    composer.current.setSize(size.width, size.height)
  }, [size])

  useFrame(() => {
    camera.layers.set(OCCLUSION_LAYER)

    occlusionComposer.current.render()
    // camera.layers.set(DEFAULT_LAYER)
    composer.current.render()
  }, 1)

  return (
    <>
      <mesh ref={light} layers={OCCLUSION_LAYER}>
        <boxBufferGeometry attach="geometry" args={[0.01, 5, 0]} />
        <meshBasicMaterial attach="material" color="white" />
      </mesh>
      <effectComposer ref={occlusionComposer} args={[gl, occlusionRenderTarget]} renderToScreen={false}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <shaderPass attachArray="passes" args={[VolumetricLightShader]} needsSwap={false} />
      </effectComposer>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <shaderPass attachArray="passes" args={[AdditiveBlendingShader]} uniforms-tAdd-value={occlusionRenderTarget.texture} />
      </effectComposer>
    </>
  )
}

function App() {
  return (
    <Canvas shadowMap>
      <ambientLight />
      <pointLight />
      <spotLight castShadow intensity={4} angle={Math.PI / 10} position={[10, 10, 10]} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <Effects />
    </Canvas>
  )
}

render(<App />, document.querySelector('#root'))
