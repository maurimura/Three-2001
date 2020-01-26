import React from 'react'
import Box from './components/Box'

const App: React.FC = props => {
  return (
    <>
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </>
  )
}

export default App
