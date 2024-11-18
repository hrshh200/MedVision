import React, { useState, useEffect } from 'react';
import { Star, MapPin, Clock, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({
  regNo,
  id,
  name,
  specialist,
  rating,
  experience,
  location,
  image,
  nextAvailable,
  fees,
}) => {
  const navigate = useNavigate();
  const [isBook, setIsBook] = useState(false);

  const fetchDataFromApi = async () => {
    try {
      const token = localStorage.getItem('medVisionToken');
      if (token) {
        setIsBook(true);
      }
    } catch (error) {
      console.error('Error booking the doctor:', error.message);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <p className="text-blue-600 font-medium">{specialist}</p>
            </div>
            <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-blue-700 font-medium">{rating || '4.8'}</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{experience} years</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-gray-600" />
              <span className="font-semibold text-gray-900">{fees}</span>
              <span className="text-gray-600">per visit</span>
            </div>

            {/* Conditional Book Now Button */}
            <div className="relative group">
              <button
                onClick={() => isBook && navigate(`/book/${regNo}`)}
                disabled={!isBook} // Disable if not logged in
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isBook
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
              >
                Book Now
              </button>

              {/* Tooltip for not logged-in state */}
              {!isBook && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Please log in to book.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
