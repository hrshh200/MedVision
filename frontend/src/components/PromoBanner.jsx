import React from 'react';
import { FileText, Stethoscope } from 'lucide-react';

const PromoBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mt-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex items-center gap-4 bg-white/80 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-3 rounded-full">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Upload Prescription</h3>
            <p className="text-sm text-gray-600">Get medicines delivered to your doorstep</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white/80 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-3 rounded-full">
            <Stethoscope className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Consult Doctor</h3>
            <p className="text-sm text-gray-600">Get expert medical advice online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;