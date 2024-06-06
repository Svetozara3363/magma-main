import axios from 'axios';

const API_URL = 'http://dokalab.com';

export const uploadImage = async (imageData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getImage = async () => {
  try {
    const response = await axios.get(`${API_URL}/picture`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};

export const deleteImage = async () => {
  try {
    const response = await axios.delete(`${API_URL}/delete_picture`);
    return response.data;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};
