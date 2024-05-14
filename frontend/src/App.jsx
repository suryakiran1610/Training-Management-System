
import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import Managerpage from './pages/manager';
import Traineepage from './pages/trainee';
import Trainerpage from './pages/trainer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/managerpage' element={<Managerpage/>}/>
          <Route path='/traineepage' element={<Traineepage/>}/>
          <Route path='/trainerpage' element={<Trainerpage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
