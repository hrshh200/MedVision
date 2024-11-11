import React from 'react';
import { Star, Clock, MapPin, Phone } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const DoctorCard = ({
  name,
  specialty,
  rating,
  experience,
  location,
  image,
  nextAvailable,
  fee
}) => {


  const navigate = useNavigate();



  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log(fee)
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    try {
      const { data } = await axios.post(
        "https://newmodel-backend.onrender.com/api/PlusCare/Home/orderCreate",
        { amount: fee * 100 }
      );
      const options = {
        key: "rzp_test_dPJR7d6F2fDtPm",
        amount: data.amount,
        currency: data.currency,
        name: "MedVision",
        description: "consultation fee",
        order_id: data.id,
        handler: async (response) => {

          try {
            const verifyUrl = "https://newmodel-backend.onrender.com/api/PlusCare/Home/payment/paymentverify";
            const { data } = await axios.post(verifyUrl, {
            });
            console.log(data);


          } catch (error) {
            console.log(error);
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        theme: {
          color: "#3399cc",
        }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

        window.open('https://www.videosdk.live/prebuilt/demo')
     





    } catch (error) {
      console.log(error);
    }
  };













  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="flex gap-4 p-4">
        <img
          src={image}
          alt={name}
          className="object-cover w-24 h-24 rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="font-medium text-blue-600">{specialty}</p>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            <span className="mr-4">{rating}</span>
            <Clock className="w-4 h-4 mr-1 text-gray-400" />
            <span>{experience}</span>
          </div>
          {/* Consultation Fee : 200 INR */}
          <div lassName="flex items-center mt-2 text-sm text-gray-600">Consultation : <span>{fee}</span></div>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            <span>{location}</span>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div onClick={handlePayment}
            className="flex items-center text-sm text-gray-600 cursor-pointer">
            <Phone className="w-4 h-4 mr-1 text-blue-500" />
            <span>Book Now</span>
          </div>
          <div className="text-sm text-gray-500">
            Next available: {nextAvailable}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;