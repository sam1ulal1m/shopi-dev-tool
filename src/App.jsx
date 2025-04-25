import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Storetool from './component/Storetool'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container flex flex-col gap-1 justify-center align-middle'>
        <Storetool />
      </div>
    </>
  )
}

export default App
