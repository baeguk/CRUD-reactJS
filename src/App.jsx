import { useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Alunos from './components/Alunos'
import Sobre from './components/Sobre'
import './css/styles.css'


function App() {

  return (
    <>
      <h1>Minha aplicação react</h1>
      <BrowserRouter>
       
       <div className="nav">
         <ul>
          <li> <NavLink to="/" className={({isActive }) => isActive ? "active" : "notActive"}> Página inicial </NavLink> </li>
          <li> <NavLink to="/alunos" className={({isActive }) => isActive ? "active" : "notActive"}> Cadastro de alunos </NavLink> </li>
          <li> <NavLink to="/sobre" className={({isActive }) => isActive ? "active" : "notActive"}> Sobre </NavLink> </li>
         </ul>
       </div>

       <Routes>
          <Route path='/' element={<Home/>}>Home</Route>
          <Route path='/alunos' element={<Alunos/>}>Alunos</Route>
          <Route path='/sobre' element={<Sobre/>}>Sobre</Route>
       </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
