import React from 'react';
import { Star, Clock, MapPin, Phone } from 'lucide-react';

const DoctorCard = ({
  name,
  specialty,
  rating,
  experience,
  location,
  image,
  nextAvailable,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="flex p-4 gap-4">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-blue-600 font-medium">{specialty}</p>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="mr-4">{rating}</span>
            <Clock className="w-4 h-4 text-gray-400 mr-1" />
            <span>{experience}</span>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <span>{location}</span>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 text-blue-500 mr-1" />
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