// server.js
import express from 'express';
import axios from 'axios';

const app = express();
const port = 5000;

app.use(express.json());  // Middleware to parse JSON body

// POST route to handle adding client
app.post('/api/addClient', async (req, res) => {
  let { client, location } = req.body;

  // Normalize both fields to lowercase to handle case sensitivity
  client = client ? client.toLowerCase() : null;
  location = location ? location.toLowerCase() : null;

  // Validate the request body
  if (!client || !location) {
    return res.status(400).json({ error: 'Client and location are required' });
  }

  // Log the data received in the request body
  console.log('Received data:', { client, location });

  try {
    // Send request to Moniffy API
    const response = await axios.post(
      'https://api.moniffy.com/add_client',
      { client, location },
      {
        headers: {
          'Authorization': 'Bearer MK_TEST_X3ALWV6QY3',  // Replace with your actual Moniffy API Key
        },
      }
    );

    // Log the response from Moniffy API
    console.log('Moniffy API Response:', response.data);

    // Send the Moniffy API response back to the client
    res.json(response.data);
  } catch (error) {
    // Log detailed error for debugging
    console.error('Error while sending request to Moniffy:', error.message);
    console.error('Error Stack:', error.stack);

    // If the error has a response (i.e., from Moniffy API)
    if (error.response) {
      console.error('Moniffy API Error Response:', error.response.data);
      console.error('Moniffy API Status:', error.response.status);
      // Pass the Moniffy API error message to the client for debugging
      return res.status(error.response.status).json({
        error: `Moniffy API Error: ${error.response.data.message || 'Unknown error'}`,
      });
    }

    // General network or other errors
    console.error('Error without response:', error);
    res.status(500).json({ error: 'Error adding client. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
