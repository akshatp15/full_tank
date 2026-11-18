import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Stats from './pages/Stats'
import './App.css'

function App() {

  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/fills/:id" element={<Edit/>}/>
        <Route path="/stats" element={<Stats/>}/>
    </Routes>
  )
}

export default App
