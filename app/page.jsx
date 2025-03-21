
"use client";

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      setStatus('Sending request...');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          timestamp: new Date(),
          action: 'button_clicked' 
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus('Success! Entry added to MongoDB.');
      } else {
        setStatus(`Error: ${data.message || 'Failed to add entry'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error: Could not connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Simple Click Logger</h1>
        
        <button
          onClick={handleClick}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Log Click to MongoDB'}
        </button>
        
        {status && (
          <div className={`mt-4 p-3 rounded-md text-center ${
            status.includes('Success') 
              ? 'bg-green-100 text-green-700' 
              : status.includes('Error') 
                ? 'bg-red-100 text-red-700' 
                : 'bg-blue-100 text-blue-700'
          }`}>
            {status}
          </div>
        )}
      </div>
    </main>
  );
}
