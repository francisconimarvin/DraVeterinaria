import React from "react";

const ProgressBar = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="mb-6">
      {/* Barra */}
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Texto abajo */}
      <p className="text-center mt-2 font-medium text-gray-700">
        Paso {step} de {totalSteps}
      </p>
    </div>
  );
};

export default ProgressBar;
