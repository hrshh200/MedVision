import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaNotesMedical, FaUserMd, FaHome, FaFilePrescription, FaHistory, FaVideo, FaUser, FaEnvelope, FaPhone, FaCalendar, FaMapMarkerAlt, FaIdCard, FaGraduationCap, FaHospital, FaWeight, FaRulerVertical } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { baseURL } from '../main';
import { FaPerson } from 'react-icons/fa6';
import DoctorDashboard from './DoctorDashboard';
import { PatientAppointmentBanner } from '../components/PatientAppointmentBanner';


// const baseURL = 'https://api.example.com'; // Replace with your actual API base URL

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const [showRecentTransactions, setShowRecentTransactions] = useState(false);
    const [status, setStatus] = useState(true);
    const [appointmentData, setAppointmentData] = useState([]);
    const navigate = useNavigate();

    // const allTransactions = [
    //     { id: 1, date: "2024-11-01", amount: 120, description: "Consultation Fee" },
    //     { id: 2, date: "2024-11-02", amount: 80, description: "Prescription Purchase" },
    //     { id: 3, date: "2024-11-05", amount: 150, description: "Lab Tests" },
    //     { id: 4, date: "2024-11-10", amount: 200, description: "Specialist Consultation" },
    //     { id: 5, date: "2024-11-15", amount: 90, description: "Follow-up Appointment" },
    //     { id: 6, date: "2024-11-20", amount: 60, description: "Medication Refill" },
    //     { id: 7, date: "2024-11-25", amount: 180, description: "Physical Therapy Session" },
    //     { id: 8, date: "2024-11-30", amount: 110, description: "Dental Checkup" },
    // ];

    // const recentTransactions = allTransactions.slice(0, 4);


    const fetchDataFromApi = async () => {
        try {
            const token = localStorage.getItem('medVisionToken');
            const response = await axios.get(`${baseURL}/fetchdata`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data.userData);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchDataFromApi();
    }, []);

    useEffect(() => {
        if (userData) {
            setAppointmentData(userData.appointments);
        }
    }, [userData]);

    // useEffect(() => {
    //     if (userData) {
    //         setStatus(userData);
    //     }
    // }, [userData]);

    const sidebarItems = userData?.regNo
        ? [
            { icon: FaHome, text: "Home", onClick: () => navigate('/'), disabled: false },
            { icon: FaPerson, text: "Profile", onClick: () => navigate('/doctorProfile'), disabled: false },
            { icon: FaUserMd, text: "Assigned Patients", onClick: () => { }, disabled: (userData?.status === 'pending' || !userData.status) },
            { icon: FaUserMd, text: "Check for diseases", onClick: () => navigate('/disease') }
        ]
        : [
            { icon: FaHome, text: "Home", onClick: () => navigate('/') },
            // { icon: FaNotesMedical, text: "Health Data Records", onClick: () => { } },
            { icon: FaPerson, text: "Profile", onClick: () => navigate('/patientProfile'), disabled: false },
            { icon: FaUserMd, text: "Book Appointments", onClick: () => navigate('/searchdoctor') },
            { icon: FaFilePrescription, text: "Search Medicine", onClick: () => navigate('/onlinepharmacy') },
            { icon: FaHistory, text: "Recent Transactions", onClick: () => setShowRecentTransactions(true) },
            { icon: FaUserMd, text: "Check for diseases", onClick: () => navigate('/disease') }
        ];

    const renderUserInfo = () => {
        if (userData?.regNo) {
            return (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                        <FaUser className="text-blue-600" />
                        <span>Dr. {userData?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaEnvelope className="text-blue-600" />
                        <span>{userData?.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaPhone className="text-blue-600" />
                        <span>{userData?.phone || '+91 9020326676'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaIdCard className="text-blue-600" />
                        <span>License: {userData?.licenseNumber || 'MD12345'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaGraduationCap className="text-blue-600" />
                        <span>Specialty: {userData?.specialty || 'Cardiology'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaHospital className="text-blue-600" />
                        <span>Hospital: {userData?.hospital || 'City General Hospital'}</span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                        <FaUser className="text-blue-600" />
                        <span>{userData?.name || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaEnvelope className="text-blue-600" />
                        <span>{userData?.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaPhone className="text-blue-600" />
                        <span>{userData?.mobile || '+91 9020326676'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaCalendar className="text-blue-600" />
                        <span>DOB: {userData?.dob || '1990-01-01'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaWeight className="text-blue-600" />
                        <span>Weight: {userData?.weight || '75'} kg</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaRulerVertical className="text-blue-600" />
                        <span>Height: {userData?.height || '175'} foot</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-blue-600" />
                        <span>{userData?.address || '123 Main Street, Cityville, USA'}</span>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar */}
            <aside className="w-64 p-6 text-white bg-sky-700">
                <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>
                <nav className="space-y-2">
                    {sidebarItems.map((item, index) => (
                        <button
                            key={index}
                            className={`flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors rounded hover:bg-blue-600 ${item.disabled ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                            onClick={!item.disabled ? item.onClick : undefined}
                            disabled={item.disabled} // Disables the button if item.disabled is true
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.text}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8">
                {userData?.regNo && userData?.status === "accepted" && (
                    <DoctorDashboard userData={userData} />
                )}
                {userData?.regNo && userData?.status === "pending" && (
                    <div className="flex items-center justify-center h-24">
                        <div className="border-2 border-yellow-600 bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md text-center">
                            <h2 className="font-semibold text-lg">Verification Pending</h2>
                            <p className="mt-1">Dear Doctor, your verification is in process. Please be patient as our admin team completes the necessary checks.</p>
                        </div>
                    </div>
                )}
                {userData?.regNo && !userData?.status && (
                    <div className="flex items-center justify-center h-24">
                        <div className="border-2 border-red-600 bg-red-100 text-red-800 p-4 rounded-lg shadow-md text-center">
                            <h2 className="font-semibold text-lg">Verification Not Initiated!</h2>
                            <p className="mt-1">Dear Doctor, your verification is not initiated. Kindly complete your profile and fill necessary details in profile section.</p>
                        </div>
                    </div>
                )}
                {!userData?.regNo && (
                    <div className="max-w-6xl mx-auto">
                        <h1 className="mb-6 text-3xl font-semibold text-blue-700">
                            {userData?.regNo ? "Doctor Dashboard" : "Patient Dashboard"}
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* User Info */}
                            <div className="p-6 bg-white rounded-lg shadow">
                                <h2 className="mb-4 text-xl font-semibold text-blue-700">User Information</h2>
                                {renderUserInfo()}
                            </div>

                            {/* Appointments Banner */}
                            <div className="p-6 bg-white rounded-lg shadow">
                                <h2 className="mb-4 text-xl font-semibold text-blue-700">Your Appointments</h2>
                                <PatientAppointmentBanner appointments={appointmentData} userData={userData} />
                            </div>
                        </div>
                    </div>

                )}
            </main>

        </div>
    );
};

export default Dashboard;