import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

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

    return (
        <>
            <div className='flex justify-between items-center px-[5rem] py-[1rem] w-full h-fit fixed top-0 z-[1000] bg-[#E1EEFF]'>
                <p onClick={() => {
                    navigate('/');
                }} className=' font-ibm text-[#0360D9] font-[600] cursor-pointer text-[2rem] leading-[41.6px]'>MedVision</p>

                <div className='flex justify-between items-center gap-[2rem]'>
                    <p onClick={() => {
                        navigate('/');
                        scrollToElement('head');
                    }} className='font-ibm  font-[400] cursor-pointer text-[1.2rem] leading-[26px]'>Home</p>
                    <p onClick={() => {
                        navigate('/');
                        scrollToElement('about');
                    }} className='font-ibm  font-[400] text-[1.2rem] cursor-pointer leading-[26px]'>Our services</p>
                    <p className='font-ibm  font-[400] text-[1.2rem] cursor-pointer leading-[26px]'>Application</p>
                    <p onClick={() => {
                        navigate('/');
                        scrollToElement('feedback');
                    }} className='font-ibm  font-[400] text-[1.2rem] cursor-pointer leading-[26px]'>Feedbacks</p>
                </div>

                <div className='flex justify-between items-center gap-[2rem]'>
                    <Link to="/login" className='font-ibm text-[#0360D9] border-2 border-[#0360D9] px-[1.5rem] py-[.5rem] rounded-[25px] font-[500] text-[1.1rem] leading-[26px]'>Login</Link>

                    <Link to="/signup" className='font-ibm text-white bg-[#0360D9] border-2 border-[#0360D9] px-[1rem] py-[.5rem] rounded-[25px] font-[500] text-[1.1rem] leading-[26px]'>Sign Up</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar
