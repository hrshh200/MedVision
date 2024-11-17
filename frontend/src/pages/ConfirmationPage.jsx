import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { date, time } = location.state;

  return (
    <div className="mt-[10vh] min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-600">Your appointment has been successfully scheduled</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Appointment Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-gray-600">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>{time}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>National Medical Center, Floor 3, Room 302</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">Important Notes</h3>
          <ul className="text-blue-700 space-y-2">
            <li>• Please arrive 15 minutes before your appointment time</li>
            <li>• Bring your medical history and any relevant documents</li>
            <li>• Wear a mask during your visit</li>
            <li>• You can reschedule up to 24 hours before the appointment</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/searchdoctor')}
            className="flex-1 py-3 rounded-lg font-medium bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            Back to Search
          </button>
          <button
            onClick={() => {/* Add download logic */}}
            className="flex-1 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            Download Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;