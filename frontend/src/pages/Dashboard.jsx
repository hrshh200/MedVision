import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaNotesMedical, FaUserMd, FaHome, FaFilePrescription, FaHistory, FaVideo, FaUser, FaEnvelope, FaPhone, FaCalendar, FaMapMarkerAlt, FaIdCard, FaGraduationCap, FaHospital, FaWeight, FaRulerVertical } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { baseURL } from '../main';
import { FaPerson } from 'react-icons/fa6';


// const baseURL = 'https://api.example.com'; // Replace with your actual API base URL

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const [showRecentTransactions, setShowRecentTransactions] = useState(false);
    const navigate = useNavigate();

    const allTransactions = [
        { id: 1, date: "2024-11-01", amount: 120, description: "Consultation Fee" },
        { id: 2, date: "2024-11-02", amount: 80, description: "Prescription Purchase" },
        { id: 3, date: "2024-11-05", amount: 150, description: "Lab Tests" },
        { id: 4, date: "2024-11-10", amount: 200, description: "Specialist Consultation" },
        { id: 5, date: "2024-11-15", amount: 90, description: "Follow-up Appointment" },
        { id: 6, date: "2024-11-20", amount: 60, description: "Medication Refill" },
        { id: 7, date: "2024-11-25", amount: 180, description: "Physical Therapy Session" },
        { id: 8, date: "2024-11-30", amount: 110, description: "Dental Checkup" },
    ];

    const recentTransactions = allTransactions.slice(0, 4);

    const healthData = [
        { date: "2024-10-01", value: 72 },
        { date: "2024-10-15", value: 75 },
        { date: "2024-11-01", value: 70 },
        { date: "2024-11-15", value: 73 },
        { date: "2024-12-01", value: 71 },
    ];

    const fetchDataFromApi = async () => {
        try {
            const token = localStorage.getItem('medVisionToken');
            const response = await axios.get(`${baseURL}/fetchdata`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data.userData);
            localStorage.setItem('userData', JSON.stringify(response.data.userData));
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchDataFromApi();
    }, []);

    const sidebarItems = userData?.regNo
        ? [
            { icon: FaHome, text: "Home", onClick: () => navigate('/') },
            { icon: FaPerson, text: "Profile", onClick: () => navigate('/doctorProfile') },
            { icon: FaUserMd, text: "Assigned Patients", onClick: () => { } },
            { icon: FaUserMd, text: "Assigned Patients", onClick: () => { } },
            { icon: FaVideo, text: "Virtual Video Call", onClick: () => navigate('/virtual-video-call') },
        ]
        : [
            { icon: FaHome, text: "Home", onClick: () => navigate('/') },
            { icon: FaNotesMedical, text: "Health Data Records", onClick: () => { } },
            { icon: FaUserMd, text: "See Doctor List", onClick: () => navigate('/searchdoctor') },
            { icon: FaFilePrescription, text: "Search Medicine", onClick: () => navigate('/onlinepharmacy') },
            { icon: FaHistory, text: "Recent Transactions", onClick: () => setShowRecentTransactions(true) }
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
                        <span>{userData?.phone || '+91 9020326676'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaCalendar className="text-blue-600" />
                        <span>DOB: {userData?.dateOfBirth || '1990-01-01'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaWeight className="text-blue-600" />
                        <span>Weight: {userData?.weight || '75'} kg</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaRulerVertical className="text-blue-600" />
                        <span>Height: {userData?.height || '175'} cm</span>
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
                            className="flex items-center w-full px-4 py-2 space-x-2 text-left transition-colors rounded hover:bg-blue-600"
                            onClick={item.onClick}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.text}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="mb-6 text-3xl font-semibold text-blue-700">
                        {userData?.regNo ? "Doctor Dashboard" : "Patient Dashboard"}
                    </h1>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-8">
                            {/* User Info */}
                            <div className="p-6 bg-white rounded-lg shadow">
                                <h2 className="mb-4 text-xl font-semibold text-blue-700">User Information</h2>
                                {renderUserInfo()}
                            </div>

                            {/* Health Data Graph (for patients) or Appointments (for doctors) */}
                            {!userData?.regNo ? (
                                <div className="p-6 bg-white rounded-lg shadow">
                                    <h2 className="mb-4 text-xl font-semibold text-blue-700">Health Data Over Time</h2>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={healthData}>
                                                <Line type="monotone" dataKey="value" stroke="blue" strokeWidth={2} />
                                                <CartesianGrid stroke="#E5E7EB" />
                                                <XAxis dataKey="date" />
                                                <YAxis />
                                                <Tooltip />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 bg-white rounded-lg shadow">
                                    <h2 className="mb-4 text-xl font-semibold text-blue-700">Upcoming Appointments</h2>
                                    <ul className="space-y-2">
                                        <li className="flex items-center justify-between">
                                            <span>John Doe</span>
                                            <span className="text-gray-500">2024-11-05 10:00 AM</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span>Jane Smith</span>
                                            <span className="text-gray-500">2024-11-05 11:30 AM</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span>Bob Johnson</span>
                                            <span className="text-gray-500">2024-11-05 2:00 PM</span>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {/* Recent Transactions */}
                            <div className="p-6 bg-white rounded-lg shadow">
                                <h2 className="mb-4 text-xl font-semibold text-blue-700">Recent Transactions</h2>
                                <div className="mb-4 space-y-4">
                                    {recentTransactions.map((transaction) => (
                                        <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                                            <div>
                                                <p className="font-medium text-blue-700">{transaction.description}</p>
                                                <p className="text-sm text-gray-500">{transaction.date}</p>
                                            </div>
                                            <span className="px-2 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded">
                                                ${transaction.amount}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                                    onClick={() => setShowAllTransactions(true)}
                                >
                                    View All Transactions
                                </button>
                            </div>
                        </div>

                        {/* Right side for All Transactions and Recent Transactions */}
                        <div className="space-y-8">
                            {showAllTransactions && (
                                <div className="p-6 bg-white rounded-lg shadow">
                                    <h2 className="mb-4 text-xl font-semibold text-blue-700">All Transactions</h2>
                                    <div className="mb-4 space-y-4 overflow-y-auto max-h-96">
                                        {allTransactions.map((transaction) => (
                                            <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                                                <div>
                                                    <p className="font-medium text-blue-700">{transaction.description}</p>
                                                    <p className="text-sm text-gray-500">{transaction.date}</p>
                                                </div>
                                                <span className="px-2 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded">
                                                    ${transaction.amount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="mb-2 text-lg font-semibold text-blue-700">Transaction History</h3>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={allTransactions}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="date" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar dataKey="amount" fill="#0000FF" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {showRecentTransactions && (
                                <div className="p-6 bg-white rounded-lg shadow">
                                    <h2 className="mb-4 text-xl font-semibold text-blue-700">Recent Transactions</h2>
                                    <div className="mb-4 space-y-4">
                                        {recentTransactions.map((transaction) => (
                                            <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                                                <div>
                                                    <p className="font-medium text-blue-700">{transaction.description}</p>
                                                    <p className="text-sm text-gray-500">{transaction.date}</p>
                                                </div>
                                                <span className="px-2 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded">
                                                    ${transaction.amount}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="mb-2 text-lg font-semibold text-blue-700">Recent Transaction History</h3>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={recentTransactions}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="date" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar dataKey="amount" fill="#0000FF" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;