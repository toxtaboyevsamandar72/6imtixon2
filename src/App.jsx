import { Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'
import Details from './pages/Details'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element = {<Home></Home>}></Route>
        <Route path='/products/:id' element = {<Details></Details>}></Route>
        <Route path='/register' element = {<Register></Register>}></Route>
        <Route path='/login' element= {<Login></Login>}></Route>
        <Route path='*' element = {<ErrorPage></ErrorPage>}> </Route>
      </Routes>
    </>
  )
}

export default App
