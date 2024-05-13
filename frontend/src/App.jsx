
import './App.css'
import Login from './pages/login'
import Register from './pages/register'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
