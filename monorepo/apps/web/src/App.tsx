import { Button } from '@fabernpm/ui'
import React from 'react'

export default function App() {
  return (
    <div className="app">
      <h1>Vite + React Example</h1>
      <button onClick={() => alert('Hello from example!')}>Click me</button>

      <Button label='hello' />
    </div>
  )
}
