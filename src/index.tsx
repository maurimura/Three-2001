import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Canvas } from 'react-three-fiber'

ReactDOM.render(
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <App />
    </Canvas>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
