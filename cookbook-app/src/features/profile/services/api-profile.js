import api from '../../../lib/axios.js';

export const updateUser = async userData => {
  try {
    const response = await api.put(`${import.meta.env.VITE_AUTH_URL}/user`, userData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error updating profile',
    };
  }
};

export const deleteUser = async () => {
  try {
    const response = await api.delete(`${import.meta.env.VITE_AUTH_URL}/user`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'UnknownError',
      message: error.response?.data?.message || 'Error deleting account',
    };
  }
};
