import React, { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import axios from "axios";
import { baseURL } from "../main";

export function PatientAppointmentBanner({ appointments }) {
  const [appointmentDetails, setAppointmentDetails] = useState([]);

  useEffect(() => {
    const fetchPatientNames = async () => {
      try {
        // Extract regNos from appointments
        const regNos = appointments.map((appointment) => appointment.regNo);

        // Send the array of regNos to the backend
        const response = await axios.post(`${baseURL}/getnames`, { regNos });

        // Create a map from the response, where the key is regNo and value is name
        const nameMap = response.data.reduce((map, doctor) => {
          map[doctor.regNo] = doctor.name;
          return map;
        }, {});

        // Combine appointments data with fetched names based on regNo
        const combinedData = appointments.map((appointment) => ({
          ...appointment,
          name: nameMap[appointment.regNo] || "Unknown", // Match regNo and get the name
        }));

        setAppointmentDetails(combinedData);
      } catch (error) {
        console.error("Error fetching patient names:", error);
      }
    };

    if (appointments?.length) fetchPatientNames();
  }, [appointments]);

  return (
    <div className="border-2 border-red-500 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-blue-700">Booked Appointments</h2>
      </div>
      
      <ul className="space-y-3">
        {appointmentDetails.map((appointment, index) => (
          <li 
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-800">{appointment.name}</span>
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
