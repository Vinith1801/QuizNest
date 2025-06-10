import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center gap-4 mb-8">
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1 className="text-3xl font-bold mb-4">Vite + React + Tailwind CSS</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)} className="btn">
            count is {count}
          </button>
        </div>
        <p className="mt-4 text-gray-600">Click the button to increment the count.</p>
      </div>
    </>
  )
}

export default App
