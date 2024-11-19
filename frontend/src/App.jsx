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
import AdminDashboard from './pages/AdminDashboard';
import DiseasePrediction from './pages/DiseasePrediction';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import HeartPrediction from './pages/HeartPrediction';
import PatientProfile from './pages/PatientProfile';
import EmergencyCare from './pages/EmergencyCare';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path='searchdoctor' element={<SearchDoctor />} />
          <Route path='disease' element={<DiseasePrediction />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='admindashboard' element={<AdminDashboard />} />
          <Route path='onlinepharmacy' element={<OnlinePharmacy />} />
          <Route path='doctorProfile' element={<DoctorProfile />} />
          <Route path='patientProfile' element={<PatientProfile />} />
          <Route path='admin' element={<AdminLogin />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/confirm/:id" element={<ConfirmationPage />} />
          <Route path="/heart-disease" element={<HeartPrediction />} />
          <Route path="/emergencyguidelines" element={<EmergencyCare />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
