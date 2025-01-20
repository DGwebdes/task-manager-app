import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:3000/'
});

//Interceptor to include the tokens in requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API.interceptors.response.use(
//     (response) => {
//         return response
//     }, (error) => {
//         if (error.response && error.response.status === 401) {
//             localStorage.removeItem('authToken');
//         }
//         return Promise.reject(error)
//     }
// );
API.interceptors.response.use(
  (response) => {
    return response; // If the response is successful, return it as is.
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle specific status codes
      switch (status) {
        case 401: // Unauthorized
          localStorage.removeItem('authToken');
          // Optionally redirect to login page
          // window.location.href = '/login';
          break;

        case 403: // Forbidden
          console.error('You do not have permission to perform this action.');
          alert('Access denied. Please contact support if you think this is a mistake.');
          break;

        case 404: // Not Found
          console.error('The requested resource was not found.');
          alert('The resource you are looking for could not be found.');
          break;

        case 500: // Internal Server Error
          console.error('Server error occurred:', data?.message || 'Unknown error.');
          alert('An unexpected error occurred on the server. Please try again later.');
          break;

        default:
          console.error(`Unhandled error: ${data?.message || error.message}`);
          alert('Something went wrong. Please try again.');
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('No response received from the server.');
      alert('Unable to connect to the server. Please check your internet connection.');
    } else {
      // Something went wrong setting up the request
      console.error('Error in request setup:', error.message);
      alert('An unexpected error occurred. Please try again.');
    }

    // Reject the error so that it can still be handled in the calling code
    return Promise.reject(error);
  }
);


export default API;
