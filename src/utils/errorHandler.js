import { toast } from 'react-toastify';

export const errorHandler = (error, defaultMessage = 'Something went Wrong!') => {
    if (error.response) {
        toast.error(error.response.data.message || defaultMessage);
    } else if (error.request) {
        toast.error('No response from the server. Please try again.');
    } else {
        toast.error(defaultMessage)
    }
};