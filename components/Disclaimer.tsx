import React from "react";

const Disclaimer: React.FC = () => {
  const AlertIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 text-amber-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v3m0 4h.01M10.29 3.86l-7.4 12.82A2 2 0 004.63 20h14.74a2 2 0 001.74-3.32l-7.4-12.82a2 2 0 00-3.42 0z"
      />
    </svg>
  );

  return (
    <div
      className="relative bg-gradient-to-r from-amber-50 to-yellow-50 
                 border border-amber-200 
                 rounded-xl p-5 shadow-md mb-6"
      role="alert"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <AlertIcon />
        </div>

        <div>
          <p className="font-semibold text-amber-800 text-lg">
            Important Medical Disclaimer
          </p>

          <p className="text-sm text-amber-700 mt-1 leading-relaxed">
            This tool provides AI-generated suggestions and is not a substitute
            for professional medical advice, diagnosis, or treatment. Always
            seek the advice of your physician or other qualified health provider
            with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200 opacity-20 rounded-full blur-2xl"></div>
    </div>
  );
};

export default Disclaimer;
