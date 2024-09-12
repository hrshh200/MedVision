import React from 'react';


//image
import arrow from '../assets/arrow.png';
import semicircle from '../assets/semicircle.png';
import doctor from '../assets/doctor.png';
import bgelement from '../assets/bg element.png';
import search from '../assets/search.png';
import pharm from '../assets/pharm.png';
import emergency from '../assets/emergency.png';
import info from '../assets/info.png';
import consultation from '../assets/consultation.png';
import tracking from '../assets/tracking.png';
import feedback from '../assets/feedback.png';


//icons
import { FaUserCircle } from "react-icons/fa";

//components
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <div className='w-full h-fit'>

        {/* section1 */}
        <div id='head' className='w-full h-[100vh] bg-[#E1EEFF] flex justify-between items-center px-[2rem] relative'>

          {/* left part search */}
          <div className='w-[50%] h-fit z-[100]'>
            <div>
              <p className='font-ibm  font-[700]  text-[4rem] leading-[80.2px]'>Find & Search Your</p>
              <div className='flex gap-[1rem]'>
                <div className='w-fit text-[#0360D9]'>
                  <p className='font-ibm  font-[700]  text-[4rem] leading-[80.2px]'>Favourite</p>
                  <img src={arrow} alt="arrow" className='w-[280px] aspect-auto' />
                </div>
                <p className='font-ibm  font-[700]  text-[4rem] leading-[80.2px]'> Doctor</p>
              </div>

              <p className='w-[80%] font-ibm  font-[400]  text-[.9rem] mt-[.5rem] leading-[20.2px] text-[#163048]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima maxime debitis distinctio animi enim neque</p>
            </div>



            <div className='w-[80%] h-fit flex justify-between items-center bg-white rounded-[30px] px-[1rem] py-[.5rem] mt-[2rem]'>
              <FaUserCircle className='text-[#0360D9] text-[2rem]' />
              <input
                className='w-[80%] h-fit outline-none px-[1rem] font-ibm font-[400]  text-[1.1rem] leading-[26px] text-[#163048]'
                type="text"
                placeholder='Search by Doctors name'
              />
              <button className='bg-[#0360D9] py-[.5rem] px-[1rem] rounded-[25px] font-ibm font-[400] text-[1.1rem] leading-[26px] text-white ml-auto'>
                Search 
              </button>
            </div>


          </div>

          {/* image */}
          <img src={semicircle} alt="semicircle" className='w-[70%] aspect-auto absolute bottom-0 right-0' />
          <img src={doctor} alt="doctor" className='h-[90vh] aspect-auto z-[10] relative top-[5vh]' />

        </div>


        {/* section2 */}
        <div id='about' className='w-full h-fit  px-[5rem] py-[1rem] relative '>
          <p className='font-mulish my-[1rem] font-[700]  text-[2.1rem] leading-[56px] text-center'>Our services</p>
          <p className='w-[80%] mx-auto font-mulish  font-[300]  text-[1.1rem] leading-[30px] text-center'>We provide to you the best choiches for you. Adjust it to your health needs and make sure your undergo treatment with our highly qualified doctors you can consult with us which type of service is suitable for your health</p>
          <div className=''>
            <img src={bgelement} alt="bgelement" className='w-[50%] aspect-auto absolute top-[-5vh] left-0 z-[-1]' />

            <div className='w-[90%] mx-auto h-fit flex flex-wrap justify-between gap-[1rem] items-center mt-[2rem] z-[100]'>
              {/* Search */}
              <div className='bg-[#FFFFFF] w-fit max-w-[320px] h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={search} alt="doctor" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>Search doctor</p>
                <p className='text-[#7D7987] text-[.9rem]'>Choose your doctor from thousands of specialist, general, and trusted hospitals</p>
              </div>

              {/* Online pharmacy */}
              <div className='bg-[#FFFFFF] w-fit max-w-[320px] h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={pharm} alt="pharm" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>Online pharmacy</p>
                <p className='text-[#7D7987] text-[.9rem]'>Buy  your medicines with our mobile application with a simple delivery system</p>
              </div>
              {/* Consultation */}
              <div className='bg-[#FFFFFF] w-fit max-w-[320px] h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={consultation} alt="Consultation" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>Consultation</p>
                <p className='text-[#7D7987] text-[.9rem]'>Free consultation with our trusted doctors and get the best recomendations</p>
              </div>
              {/* Details info */}
              <div className='bg-[#FFFFFF] w-fit  max-w-[320px] h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={info} alt="info" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>Details info</p>
                <p className='text-[#7D7987] text-[.9rem]'>Free consultation with our trusted doctors and get the best recomendations</p>
              </div>
              {/* Details info */}
              <div className='bg-[#FFFFFF] w-fit  max-w-[320px] h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={emergency} alt="emergency" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>Emergency care</p>
                <p className='text-[#7D7987] text-[.9rem]'>You can get 24/7 urgent care for yourself or your children and your lovely family</p>
              </div>
              {/* Details info */}
              <div className='bg-[#FFFFFF] w-fit  max-w-[320px] h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={tracking} alt="tracking" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>Tracking</p>
                <p className='text-[#7D7987] text-[.9rem]'>Track and save your medical history and health data </p>
              </div>

            </div>
          </div>
        </div>


        {/* section3 */}
        <div id='feedback' className='w-full h-[100vh] px-[5rem] py-[1rem] relative flex justify-between items-center'>

          {/* leftpart */}
          <div className='w-[50%] h-fit '>
            <p className='font-ibm  font-[700]  text-[4rem] leading-[80.2px]'>What Our <span className='text-[#0360D9]'>Patient’s
              Saying</span> About Us</p>
            <p className='w-[80%] font-ibm  font-[400]  text-[.9rem] mt-[.5rem] leading-[20.2px] text-[#163048]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima maxime debitis distinctio animi enim neque</p>
          </div>

          {/* rightpart */}
          <img src={feedback} alt="feedback" />
        </div>


        {/* footer */}
        <Footer />
      </div>
    </>
  )
}

export default Home
