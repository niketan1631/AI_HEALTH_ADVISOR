import React from 'react';
import { HealthAdvice } from '../types';

interface ResultCardProps {
  advice: HealthAdvice;
}

const ResultCard: React.FC<ResultCardProps> = ({ advice }) => {

  const PillIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
  );

  const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.5 20h15a2 2 0 001.71-3.14l-7.5-13a2 2 0 00-3.42 0z" />
    </svg>
  );

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 mt-6 border border-gray-100 transition-all duration-300 hover:shadow-2xl animate-fade-in">

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        🩺 AI Health Suggestions
      </h2>

      {/* Medicines */}
      <div className="mb-8">

        <div className="flex items-center mb-4">
          <PillIcon />
          <h3 className="ml-3 text-lg font-semibold text-gray-700">
            Suggested Medicines
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {advice.suggestedMedicines.map((med, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:scale-105 transition"
            >
              💊 {med}
            </span>
          ))}
        </div>

      </div>

      {/* Doctor Advice */}
      <div className="mb-8">

        <div className="flex items-center mb-4">
          <HeartIcon />
          <h3 className="ml-3 text-lg font-semibold text-gray-700">
            Doctor Advice
          </h3>
        </div>

        <ul className="space-y-3">
          {advice.doctorAdvice.map((adv, index) => (
            <li
              key={index}
              className="bg-gray-50 p-3 rounded-lg text-gray-700 shadow-sm"
            >
              ✔ {adv}
            </li>
          ))}
        </ul>

      </div>

      {/* Disclaimer */}
      <div className="bg-orange-50 border border-orange-200 p-5 rounded-xl">

        <div className="flex items-start">

          <div className="mr-3">
            <WarningIcon />
          </div>

          <div>
            <h3 className="text-md font-semibold text-orange-700">
              Medical Disclaimer
            </h3>

            <p className="text-sm text-orange-700 mt-2 leading-relaxed">
              {advice.importantDisclaimer}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ResultCard;
