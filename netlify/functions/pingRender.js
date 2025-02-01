export async function handler() {
  const url = 'https://task-manager-server-3i2w.onrender.com';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Server ping failed with status: ${response.status}`);
    }

    return {
      statusCode: 200,
      body: 'Server pinged successfully',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Server ping failed: ${error.message}`,
    };
  }
}
