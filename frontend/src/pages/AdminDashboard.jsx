import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaNotesMedical, FaUserMd, FaHome, FaFilePrescription, FaHistory, FaVideo, FaUser, FaEnvelope, FaPhone, FaCalendar, FaMapMarkerAlt, FaIdCard, FaGraduationCap, FaHospital, FaWeight, FaRulerVertical } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { baseURL } from '../main';
import { FaPerson } from 'react-icons/fa6';


// const baseURL = 'https://api.example.com'; // Replace with your actual API base URL

const Dashboard = () => {
    const [adminData, setAdminData] = useState(null);
    const navigate = useNavigate();

    const fetchDataFromApi = async () => {
        try {
            const token = localStorage.getItem('medVisionToken');
            const response = await axios.get(`${baseURL}/adminfetchdata`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAdminData(response.data.adminData);
            localStorage.setItem('adminData', JSON.stringify(response.data.adminData));
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchDataFromApi();
    }, []);

    // useEffect(() => {
    //     if (adminData) {
    //         setStatus(adminData);
    //     }
    // }, [adminData]);

    const sidebarItems = 
         [
            { icon: FaHome, text: "Home", onClick: () => navigate('/'), disabled: false },
            { icon: FaPerson, text: "Profile", onClick: () => navigate('/adminProfile'), disabled: false },
        ]

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar */}
            <aside className="w-64 p-6 text-white bg-sky-700">
                <h2 className="mb-6 text-2xl font-bold"> Admin Dashboard</h2>
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
                <div>
                    Admin
                </div>
            </main>

        </div>
    );
};

export default Dashboard;