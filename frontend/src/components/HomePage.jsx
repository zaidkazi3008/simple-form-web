import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username) {
        navigate(`/form?username=${username}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Welcome to My Form App</h2>
      <p className="text-gray-700 mb-6">
        This is a simple form application where you can provide your information.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your username"
        />
        <button
           onClick={handleSubmit}
          className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Go to Form
        </button>
      </div>
    </div>
  </div>
  );
}

export default Homepage;
