import axios from 'axios';

export const handler = async () => {
  const url ='https://task-manager-server-3i2w.onrender.com';

  try {
    const response = await axios.get(url, { timeout: 5000 });
    console.log(`Ping response status: ${response.status}`);
    return {
      statusCode: 200,
      body: 'Server pinged successfully',
    };
  } catch (error) {
    console.error(`Ping failed: ${error.message}`);
    return {
      statusCode: 500,
      body: `Server ping failed: ${error.message}`,
    };
  }
};