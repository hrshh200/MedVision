import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  // Generate time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedSlot) {
      navigate(`/confirm/${id}`, {
        state: { date: selectedDate, time: selectedSlot }
      });
    }
  };

  return (
    <div className="mt-[10vh] min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Search
        </button>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Appointment Time</h2>

          {/* Date Selection */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Select Date</h3>
            </div>
            <div className="grid grid-cols-7 gap-3">
              {dates.map((date) => {
                const d = new Date(date);
                const isSelected = date === selectedDate;
                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg text-center transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-blue-50 border border-gray-200'
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {d.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-lg font-semibold">
                      {d.getDate()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Select Time</h3>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {timeSlots.map((time) => {
                  const isSelected = time === selectedSlot;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedSlot(time)}
                      className={`p-3 rounded-lg text-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-blue-50 border border-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedSlot}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedDate && selectedSlot
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;