import { Route, Routes } from 'react-router-dom'
import './App.css'

//pages
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchDoctor from './pages/SearchDoctor';
import OnlinePharmacy from './pages/OnlinePharmacy';
import Dashboard from './pages/Dashboard';
import DoctorProfile from './pages/DoctorProfile';
import AdminLogin from './components/AdminLogin';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path='searchdoctor' element={<SearchDoctor />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='onlinepharmacy' element={<OnlinePharmacy />} />
          <Route path='doctorProfile' element={<DoctorProfile />} />
          <Route path='admin' element={<AdminLogin />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
