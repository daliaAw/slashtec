import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AddClient() {
  const [client, setClient] = useState('');
  const [location, setLocation] = useState('');

  const handleAddClient = async () => {
    if (!client || !location) {
      alert('Please fill in both client and location fields!');
      return;
    }

    const normalizedClient = client.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();

    const requestData = {
      client: normalizedClient,
      location: normalizedLocation,
    };

    try {
      // Send request to your backend (not directly to Moniffy)
      const response = await axios.post(
        'http://localhost:5000/api/addClient',
        requestData
      );

      console.log('Server Response:', response.data);
      alert(`Client "${client}" added successfully at location "${location}"`);

      setClient('');
      setLocation('');
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Error adding client. Please try again.');
    }
  };


  return (
    <div className="flex w-screen h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 p-8 flex flex-col">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12 select-none">X</h2>
        <nav className="flex flex-col space-y-6">
          <Link
            to="/home"
            className="text-lg text-gray-700 hover:text-indigo-600 font-semibold transition-colors duration-300"
          >
            ↩ Back to Home
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col items-center justify-center p-16">
        <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Add Client</h2>
          <input
            type="text"
            placeholder="Client"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full mb-6 px-4 py-3 text-black border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mb-6 px-4 py-3 text-black border border-gray-300 rounded"
          />
          <button
            onClick={handleAddClient}
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 font-semibold shadow"
          >
            Add Client
          </button>
        </div>
      </main>
    </div>
  );
}
