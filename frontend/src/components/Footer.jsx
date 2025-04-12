
import { useState } from 'react';

//image
// import Logo1 from '../assets/logo1.png';


//icons
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";



function Footer() {
    const [email, setEmail] = useState("");
    function emailHandler(e) {
        setEmail(e.target.value);
    }
    function submitEmailHandler() {
        console.log(email);
        setEmail("");
    }

    //scroll-smooth
    function scrollSmooth() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div>
            {/* section */}
            <div className="w-full h-fit bg-[#0360D9] text-white pb-[1rem]">
                <div className="w-[95%] sm:w-[80%] mx-auto">
                    <div className="">
                        <div className="w-[90%] mx-auto text-[.9rem] flex-row  flex justify-between items-center ">
                            <p className='text-[1.2rem]'>MedVision

                            </p>
                            {/* <p className='mt-[1.8rem]'>Made by Harsh, Rohit & Shiwang</p> */}
                        </div>

                        <p className="bg-gray-400 w-[100%] mx-auto h-[.08px] mb-[1rem] "></p>
                    </div>

                    <div className="w-full py-[2rem] flex lg:flex-row flex-col justify-between items-center">
                        <div className="w-[100%] lg:w-[30%] flex flex-col justify-center items-center lg:items-start mb-[1rem] lg:mb-0">
                            <p className="text-[1.4rem] leading-tight mb-[1rem]">
                                Subscribe to our
                                <br className="lg:block hidden" /> newsletter
                            </p>
                            <div className="w-fit flex flex-nowrap ">
                                <input
                                    className="h-[3rem] sm:w-[300px] md:w-[250px] mx-auto bg-transparent border-b-2 focus:outline-none"
                                    type="email"
                                    value={email}
                                    onChange={emailHandler}
                                    placeholder="Email Address"
                                    required
                                />
                                <button
                                    onClick={submitEmailHandler}
                                    className="bg-[#EAB308] h-[3rem] px-2 rounded-t-md text-black font-semibold"
                                >
                                    <MdOutlineKeyboardArrowRight className='size-8' />
                                </button>
                            </div>
                        </div>
                        <div className="flex sm:justify-around justify-between w-[98%] lg:w-[70%] sm:gap-[.5rem] gap-[.3rem]">
                            <div className="flex flex-col gap-[.5rem]">
                            <p className="text-[.7rem] sm:text-[.9rem]">Doctor's Login</p>
                                
                                <Link
                                    onClick={scrollSmooth}
                                    to="/login"
                                >
                                    <div className="text-[.7rem] sm:text-[.9rem]">
                                        Login Doctor
                                    </div>
                                </Link>
                                <Link
                                    onClick={scrollSmooth}
                                    to="/signup"
                                >
                                    <div className="text-[.7rem] sm:text-[.9rem]">
                                        Signup
                                    </div>
                                </Link>
                            </div>
                            <div className="flex flex-col gap-[.5rem]">
                                <p className="text-[.7rem] sm:text-[.9rem]">About</p>
                                <Link onClick={scrollSmooth} to="/">
                                    <div className="text-[.7rem] sm:text-[.9rem]">Our Blogs</div>
                                </Link>
                                <Link onClick={scrollSmooth} to="/">
                                    <div className="text-[.7rem] sm:text-[.9rem]">Privacy Policy</div>
                                </Link>
                                <Link onClick={scrollSmooth} to="/">
                                    <div className="text-[.7rem] sm:text-[.9rem]">Terms & condition</div>
                                </Link>
                            </div>
                            <div className="flex flex-col gap-[.5rem]">
                                <p className="text-[.7rem] sm:text-[.9rem]">User's Login</p>
                                
                                <Link
                                    onClick={scrollSmooth}
                                    to="/login"
                                >
                                    <div className="text-[.7rem] sm:text-[.9rem]">
                                        Login User
                                    </div>
                                </Link>
                                <Link
                                    onClick={scrollSmooth}
                                    to="/signup"
                                >
                                    <div className="text-[.7rem] sm:text-[.9rem]">
                                        Signup
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </div>

                    <div className="w-full flex md:flex-row flex-col justify-between items-center ">

                        <div className="flex gap-[1rem] my-[1rem]">
                            <Link to="">
                                <FaLinkedin className='size-8 rounded-lg  text-sky-800 bg-white' />
                            </Link>

                        </div>
                    </div>
                </div>
                <p className="bg-gray-400 w-[90%] mx-auto h-[.08px] mb-[1rem] "></p>

                <div className="w-[90%] mx-auto text-[.9rem] flex justify-center items-center text-center">
                    <p>All Rights Reserved © MEDVISION PRIVATE LIMITED 2024</p>

                </div>
            </div>
        </div>
    );
}

export default Footer;

