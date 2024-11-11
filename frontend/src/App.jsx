import { Route, Routes } from 'react-router-dom'
import './App.css'

//pages
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchDoctor from './pages/SearchDoctor';
import OnlinePharmacy from './pages/OnlinePharmacy';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path='searchdoctor' element={<SearchDoctor />} />
          <Route path='onlinepharmacy' element={<OnlinePharmacy />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
