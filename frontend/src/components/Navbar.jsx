import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../main';
import axios from 'axios';

const Navbar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('medVisionToken');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    // console.log(medVisionToken);




    const scrollToElement = (id) => {
        const element = document.getElementById(id);
        const headerOffset = 50; // Adjust this value to match the height of your fixed header

        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        } else {
            console.warn(`Element with ID "${id}" not found.`);
        }
    };

    const fetchDataFromApi = async () => {
        try {
            const response = await axios.get(`${baseURL}/fetchdata`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Returning the fetched data
            // console.log(response.data);
            setUserData(response.data.userData);
            localStorage.setItem('userData', JSON.stringify(response.data.userData));
        } catch (error) {
            console.error("Error fetching data from API:", error.message);
            throw error;
        }
    };

    const fetchadminDataFromApi = async () => {
        try {
            const response = await axios.get(`${baseURL}/adminfetchdata`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Returning the fetched data
            // console.log(response.data);
            setAdminData(response.data.adminData);
            localStorage.setItem('adminData', JSON.stringify(response.data.adminData));
        } catch (error) {
            console.error("Error fetching data from API:", error.message);
            throw error;
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);


    useEffect(() => {
        if (token) {
            fetchDataFromApi();
            fetchadminDataFromApi();
        }
        if (localStorage.getItem('userData') || localStorage.getItem('adminData')) {
            setIsLoggedIn(true);
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('medVisionToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('adminData');
        setIsLoggedIn(false);
        navigate('/');
    };

    const options = { weekday: 'short', day: '2-digit', month: 'short', year: '2-digit' };
    const formattedDate = currentTime.toLocaleDateString(undefined, options);
    const formattedTime = currentTime.toLocaleTimeString();

    return (
        <>
            <div className='flex justify-between items-center px-[2rem] py-[1rem] w-full h-fit fixed top-0 z-[1000] bg-[#E1EEFF]'>
                <p onClick={() => {
                    navigate('/');
                }} className=' font-ibm text-[#0360D9] font-[600] text-[2rem] leading-[41.6px]'>MedVision</p>

                <div className='flex justify-between items-center gap-[2rem]'>
                    <p onClick={() => {
                        navigate('/');
                        scrollToElement('head');
                    }} className='font-ibm  font-[400] cursor-pointer text-[1.2rem] leading-[26px] hover:text-blue-500 hover:underline underline-offset-8'>Home</p>
                    <p onClick={() => {
                        navigate('/');
                        scrollToElement('about');
                    }} className='font-ibm  font-[400] text-[1.2rem] cursor-pointer leading-[26px] hover:text-blue-500 hover:underline underline-offset-8'>Our services</p>
                    <p className='font-ibm  font-[400] text-[1.2rem] cursor-pointer leading-[26px] hover:text-blue-500 hover:underline underline-offset-8'>Application</p>
                    <p onClick={() => {
                        navigate('/');
                        scrollToElement('feedback');
                    }} className='font-ibm  font-[400] text-[1.2rem] cursor-pointer leading-[26px] hover:text-blue-500 hover:underline underline-offset-8'>Feedbacks</p>
                </div>
                {!isLoggedIn ? (
                    <div className='flex justify-between items-center gap-[2rem]'>
                        <Link to="/login" className='font-ibm text-[#0360D9] border-2 border-[#0360D9] px-[1.5rem] py-[.5rem] rounded-[25px] font-[500] text-[1.1rem] leading-[26px]'>Login</Link>
                        <Link to="/signup" className='font-ibm text-white bg-[#0360D9] border-2 border-[#0360D9] px-[1rem] py-[.5rem] rounded-[25px] font-[500] text-[1.1rem] leading-[26px]'>Sign Up</Link>
                        <Link to="/admin" className='font-ibm text-white bg-[#0360D9] border-2 border-[#0360D9] px-[1rem] py-[.5rem] rounded-[25px] font-[500] text-[1.1rem] leading-[26px]'>Admin Login</Link>
                    </div>
                ) : (
                    <div className='flex justify-between items-center gap-[2rem]'>
                        <button
                            onClick={() => {
                                if (adminData) {
                                    navigate('/admindashboard');
                                } else if (userData) {
                                    navigate('/dashboard');
                                }
                            }}
                            className='font-ibm text-white bg-[#0360D9] border-2 border-[#0360D9] px-[1rem] py-[.5rem] rounded-[25px] font-[500] text-[1.1rem] leading-[26px]'
                        >
                            Dashboard
                        </button>
                        <button onClick={handleLogout} className='font-ibm bg-white text-[#0360D9] border-2 border-[#0360D9] px-[1rem] py-[.5rem] rounded-[25px] font-[500] text-[1.1rem] leading-[26px]'>Logout</button>
                    </div>
                )}
                <div className="p-4  text-blue-500 rounded-lg  text-center">
                    <p className="text-sm">{formattedDate}</p>
                    <p className="text-lg font-bold mt-1">{formattedTime}</p>
                </div>

            </div>
        </>
    )
}

export default Navbar
