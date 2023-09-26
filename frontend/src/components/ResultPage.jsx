import React from 'react';
import { useNavigate } from 'react-router-dom';

function ResultPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-semibold mb-4">Form Submitted Successfully</h2>
        <p className="text-gray-700 mb-6">
          Thank you for submitting your information. We have received your details.
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
