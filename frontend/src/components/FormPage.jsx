import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function FormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    name: '',
    dateOfBirth: '',
  });
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    // Fetch existing data if available
    const username = new URLSearchParams(location.search).get('username');
    if (username) {
      // Fetch data based on username from your backend API
      axios.get(`http://localhost:5000/api/getForm?username=${username}`).then((response) => {
        if (response.data) {
          setFormData(response.data);
          setIsNewUser(false); // Username already exists
          
        }
      });
    }
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Submit form data to your backend API
    axios.post('http://localhost:5000/api/submitForm', formData).then(() => {
        navigate('/result');
    });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md">
      <p className="text-3xl font-semibold mb-4">{isNewUser ? 'Creating a new user' : 'Updating existing user'}</p>
      <h2 className="text-3xl font-semibold mb-4">Form Page</h2>
      {isNewUser && (
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
            />
      )}
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </form>
      <button className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none" onClick={handleSubmit}>Submit</button>
      <button className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none" onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default FormPage;
