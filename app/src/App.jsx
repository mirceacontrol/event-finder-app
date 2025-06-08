import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        🎉 Tailwind is Working! 🎉
      </h1>
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-3">
        <p className="text-lg text-gray-700">
          If you see this box with rounded corners, shadows, and blue text, <b>Tailwind CSS is set up correctly.</b>
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition">
          Test Button
        </button>
      </div>
      <p className="mt-12 text-gray-400">Edit <code>src/App.jsx</code> to start your project!</p>
    </div>
  )
}

export default App