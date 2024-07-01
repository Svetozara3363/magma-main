const API_URL = "https://dokalab.com";

export const uploadImage = async (imageData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Session-ID": getCookie("session_id"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export const getImage = async () => {
  try {
    const response = await axios.get(`${API_URL}/picture`);
    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};

export const deleteImage = async () => {
  try {
    const response = await axios.delete(`${API_URL}/delete_picture`);
    return response.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};