import React from 'react';

//images
import patient from '../assets/loginpatient.png'
import doctor from '../assets/logindoctor.png'

const LoginSignup = ({ title, setIsDoctor }) => {

    return (
        <>
            <div className='w-full max-w-[60%] shadow-lg h-[70vh] flex flex-col justify-center items-center rounded-[10px]'>
                <p className='font-[600] text-[1.8rem] my-[1rem] leading-[42px] text-[#00000099]'>{title}</p>
                <p className='w-[80%] text-center font-[600] mb-[2rem] text-[1.4rem]  leading-[24px] text-[#00000073]'>"Your health is our priority—log in to access personalized care and trusted medical expertise."</p>

                <div className=' flex justify-center items-center gap-[1.5rem]'>
                    <img onClick={() => {
                        setIsDoctor('doctor');
                    }} src={doctor} alt="doctor" className='w-[200px] aspect-auto cursor-pointer hover:w-[210px]' />
                    <img onClick={() => {
                        setIsDoctor('patient');
                    }} src={patient} alt="patient" className='w-[150px] aspect-auto cursor-pointer hover:w-[160px]' />
                </div>
            </div>
        </>
    )
}

export default LoginSignup
