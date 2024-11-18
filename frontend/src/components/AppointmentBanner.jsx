import React from "react";
import { Calendar, Clock, User } from "lucide-react";

export function AppointmentBanner({ appointments }) {
  return (
    <div className="border-2 border-red-500 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-blue-700">Upcoming Appointments</h2>
      </div>
      
      <ul className="space-y-3">
        {appointments.map((appointment, index) => (
          <li 
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-800">{appointment.patientName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <button 
                className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-all"
              >
                {appointment.slot || "No Slot Available"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}