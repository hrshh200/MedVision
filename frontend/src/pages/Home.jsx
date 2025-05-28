import React, { useState } from 'react';
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
import { FaUserCircle } from "react-icons/fa";
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { baseURL } from '../main';
import axios from 'axios';
import TestimonialCarousel from '../components/Testimonials/TestimonialCarousel';
import Chatbot from '../../../chatbot-app/frontend/src/components/chatbot';

const Home = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ // form data for both doctor and patient
    name: '',
    location: '',
  });
  // const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickSearch = () => {
    navigate('/searchdoctor');
    console.log("Clicked on Search Doctor");
  }

  const handleConsultation = () => {
    navigate('/');
    console.log("Clicked on Search Doctor");
  }

  const handleOnlinePharmacy = () => {
    navigate('/onlinepharmacy');
    console.log("Clicked on Online Pharmacy");
  }

  const handleMLPharmacy = () => {
    navigate('/disease');
    console.log("Clicked on predicted ML");
  }

  const handleEmergencyPharmacy = () => {
    navigate('/emergencyguidelines');
    console.log("Clicked on predicted ML");
  }

  const handleTracking = () => {
    navigate('/tracking');
    console.log("Clicked on tracking order");
  }

  const submitHandler = async () => {
    event.preventDefault(e);
    try {
      const response = await axios.post(`${baseURL}/fetchdoctors`, formData);
      if (response === 200) {
        console.log("Data fetched successfully:", response.data);
        toast.success('Doctor Found!')
      }
      else {
        toast.error('Error founding doctor');
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };


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
            </div>


            {/* Searching for doctor by name and location */}
            {/* <form onSubmit={submitHandler}>
              <div className='w-[80%] h-fit flex justify-between items-center bg-white rounded-[30px] px-[1rem] py-[.5rem] mt-[2rem]'>
                <FaUserCircle className='text-[#0360D9] text-[2rem]' />
                <input
                  className='w-[50%] h-fit outline-none px-[1rem] font-ibm font-[400]  text-[1.1rem] leading-[26px] text-[#163048]'
                  type="text"
                  placeholder='Doctor Name'
                  value={formData.name}
                  name='name'
                  onChange={handleChange}
                />
                <input
                  className='w-[30%] h-fit outline-none px-[1rem] font-ibm font-[400]  text-[1.1rem] leading-[26px] text-[#163048]'
                  type="text"
                  placeholder='Location'
                  value={formData.location}
                  name='location'
                  onChange={handleChange}
                />
                <button className='bg-[#0360D9] w-[3rem] h-[3rem] rounded-full flex justify-center items-center text-white ml-auto'>
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.742 10.9037C12.7103 9.55875 13.144 7.8913 12.9563 6.2349C12.7686 4.5785 11.9734 3.05531 10.7298 1.97006C9.48612 0.884811 7.88575 0.317542 6.24884 0.381741C4.61192 0.445941 3.05919 1.13687 1.90127 2.31631C0.743353 3.49575 0.0656519 5.07671 0.00375008 6.7429C-0.0581517 8.40909 0.500311 10.0376 1.56741 11.3027C2.63451 12.5678 4.13155 13.3761 5.75902 13.566C7.38649 13.7558 9.02438 13.3132 10.345 12.3266H10.344C10.374 12.3673 10.406 12.406 10.442 12.4437L14.292 16.3624C14.4795 16.5534 14.7339 16.6608 14.9991 16.6609C15.2644 16.661 15.5189 16.5538 15.7065 16.3629C15.8941 16.1721 15.9996 15.9132 15.9997 15.6432C15.9998 15.3732 15.8945 15.1142 15.707 14.9232L11.857 11.0044C11.8212 10.9676 11.7828 10.9336 11.742 10.9026V10.9037ZM12 6.99102C12 7.72619 11.8577 8.45415 11.5813 9.13336C11.3049 9.81257 10.8998 10.4297 10.3891 10.9496C9.87837 11.4694 9.27205 11.8818 8.60476 12.1631C7.93747 12.4444 7.22227 12.5892 6.5 12.5892C5.77773 12.5892 5.06253 12.4444 4.39524 12.1631C3.72795 11.8818 3.12164 11.4694 2.61091 10.9496C2.10019 10.4297 1.69506 9.81257 1.41866 9.13336C1.14226 8.45415 1 7.72619 1 6.99102C1 5.50628 1.57946 4.08235 2.61091 3.03248C3.64236 1.98261 5.04131 1.3928 6.5 1.3928C7.95869 1.3928 9.35764 1.98261 10.3891 3.03248C11.4205 4.08235 12 5.50628 12 6.99102Z" fill="white" />
                  </svg>
                </button>

              </div>
            </form> */}



          </div>

          {/* image */}
          <img src={semicircle} alt="semicircle" className='w-[70%] aspect-auto absolute bottom-0 right-0' />
          <img src={doctor} alt="doctor" className='h-[90vh] aspect-auto z-[10] relative top-[5vh]' />

        </div>


        {/* section2 */}
        <div id='about' className='w-full h-fit  px-[5rem] py-[1rem] relative '>
          <p className='font-mulish my-[1rem] font-[700]  text-[2.1rem] leading-[56px] text-center'>Our services</p>
          <Chatbot />
          <p className='w-[80%] mx-auto font-mulish  font-[300]  text-[1.1rem] leading-[30px] text-center'>We provide to you the best choiches for you. Adjust it to your health needs and make sure your undergo treatment with our highly qualified doctors you can consult with us which type of service is suitable for your health</p>
          <div className=''>
            <img src={bgelement} alt="bgelement" className='w-[50%] aspect-auto absolute top-[-5vh] left-0 z-[-1]' />

            <div className='w-[90%] mx-auto h-fit flex flex-wrap justify-between gap-[1rem] items-center mt-[2rem] z-[100]'>
              {/* Search */}
              <div onClick={handleClickSearch} className='bg-[#FFFFFF] w-fit max-w-[320px] cursor-pointer h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={consultation} alt="Consultation" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>Book Appointments</p>
                <p className='text-[#7D7987] text-[.9rem]'>Choose your doctor from thousands of specialist, general, and trusted hospitals</p>
              </div>

              {/* Online pharmacy */}
              <div onClick={handleOnlinePharmacy} className='bg-[#FFFFFF] w-fit max-w-[320px] cursor-pointer h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={pharm} alt="pharm" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>Online Pharmacy</p>
                <p className='text-[#7D7987] text-[.9rem]'>Buy  your medicines with our mobile application with a simple delivery system</p>
              </div>
              {/* Consultation */}
              <div onClick={handleConsultation} className='bg-[#FFFFFF] w-fit max-w-[320px] cursor-pointer h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={search} alt="doctor" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>24/7 Health Support</p>
                <p className='text-[#7D7987] text-[.9rem]'>Access round-the-clock consultations with trusted medical professionals for timely care and guidance.</p>
              </div>
              {/* Details info */}
              <div onClick={handleMLPharmacy}className='bg-[#FFFFFF] w-fit  max-w-[320px] cursor-pointer h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={info} alt="info" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>Predict with ML</p>
                <p className='text-[#7D7987] text-[.9rem]'>We have many ML models traied to predict various diseases</p>
              </div>
              {/* Details info */}
              <div onClick={handleEmergencyPharmacy} className='bg-[#FFFFFF] w-fit  max-w-[320px] cursor-pointer h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={emergency} alt="emergency" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>Emergency care</p>
                <p className='text-[#7D7987] text-[.9rem]'>You can get 24/7 urgent care for yourself or your children and your lovely family</p>
              </div>
              {/* Details info */}
              <div  className='bg-[#FFFFFF] w-fit  max-w-[320px] cursor-pointer h-fit min-h-[220px] p-[1rem] rounded-[20px] shadow-lg '>
                <img src={tracking} alt="tracking" className='h-[80px] aspect-auto' />
                <p className='font-mulish font-[700] text-[1.5rem] leading-[56px]'>View Doctors</p>
                <p className='text-[#7D7987] text-[.9rem]'>Browse through available doctors, schedule appointments, and maintain a timeline of your consultations.</p>

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
