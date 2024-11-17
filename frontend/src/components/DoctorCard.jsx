import React from 'react';
import { Star, MapPin, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({
  id,
  name,
  specialist,
  rating,
  experience,
  location,
  image,
  nextAvailable,
  fees
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
      <div className="flex gap-6">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <p className="text-blue-600 font-medium">{specialist}</p>
            </div>
            <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-blue-700 font-medium">{rating}</span>
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
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span className="font-semibold text-gray-900">{fees}</span>
              <span className="text-gray-600">per visit</span>
            </div>
            <button
              onClick={() => navigate(`/book/${id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;