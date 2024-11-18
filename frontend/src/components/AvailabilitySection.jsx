import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { baseURL } from '../main';

const AvailabilitySection = ({ regno }) => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [userData, setUserData] = useState(null);
    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];

    const handleSlotToggle = (slot) => {
        setSelectedSlots(prev =>
            prev.includes(slot)
                ? prev.filter(s => s !== slot)
                : [...prev, slot]
        );
    };

    const fetchDataFromApi = async () => {
        try {
            const token = localStorage.getItem('medVisionToken');
            const response = await axios.get(`${baseURL}/fetchdata`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const fetchedData = response.data.userData;
            setUserData(fetchedData);
    
            if (fetchedData?.available?.length > 0) {
                setSelectedSlots(fetchedData.available); // Set the existing slots
                setIsAvailable(false); // Default to showing ExistingSlotsView
            } else {
                setIsAvailable(true); // Default to availability selector if no slots exist
            }
    
            localStorage.setItem('userData', JSON.stringify(fetchedData));
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };
    

    useEffect(() => {
        fetchDataFromApi();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                regno,
                slots: selectedSlots,
            };
            const response = await axios.post(`${baseURL}/updateslots`, payload);
            if (response.status === 200) {
                toast.success('Slots updated for today!');
                fetchDataFromApi(); // Refresh data after update
            }
        } catch (error) {
            toast.error('Error updating slots');
            console.error(error);
        }
    };

    // Render existing slots view
    const ExistingSlotsView = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Today's Available Slots
                </h2>
                <button
                    onClick={() => setIsAvailable(!isAvailable)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    Edit Slots
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userData?.available?.map((slot) => (
                    <div
                        key={slot}
                        className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center"
                    >
                        <span className="text-blue-700 font-medium">{slot}</span>
                    </div>
                ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <p className="text-gray-600 text-sm text-center">
                    These slots are currently available for patient bookings
                </p>
            </div>
        </div>
    );

    // Render availability selector view
    const AvailabilitySelectorView = () => (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Set Today's Availability
                </h2>
                <div className="flex items-center gap-3">
                    <span className="text-gray-600">Are you available today?</span>
                    <button
                        onClick={() => {
                            setIsAvailable(!isAvailable);
                            if (!isAvailable) setSelectedSlots([]);
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${isAvailable ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${isAvailable ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {isAvailable && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Select your available time slots</span>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {timeSlots.map((slot) => {
                            const isSelected = selectedSlots.includes(slot);
                            return (
                                <button
                                    key={slot}
                                    onClick={() => handleSlotToggle(slot)}
                                    className={`p-3 rounded-lg text-center transition-all duration-200 ${isSelected
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'hover:bg-blue-50 border border-gray-200'
                                        }`}
                                >
                                    {slot}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Save Availability
                        </button>
                    </div>
                </div>
            )}
        </>
    );

    return (
        <div className="bg-white rounded-lg shadow p-6">
            {userData?.available?.length > 0 && !isAvailable ? (
                <ExistingSlotsView />
            ) : (
                <AvailabilitySelectorView />
            )}
        </div>
    );
};

export default AvailabilitySection;