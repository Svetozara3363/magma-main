import React, { useEffect, useState } from "react";
import "./Pictures.css";

function Pictures() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try {
      const response = await fetch(`/api/pictures`, {
        headers: {
          'Session-ID': getCookie('session_id')
        }
      });
      if (response.ok) {
        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
      } else {
        console.error("Failed to fetch the image.");
      }
    } catch (error) {
      console.error("Error fetching image: ", error);
    }
  };

  return (
    <div className="Pictures">
      <h2>Your uploaded image</h2>
      {image ? (
        <img src={image} alt="Uploaded" className="uploaded-image" />
      ) : (
        <p>No image uploaded yet.</p>
      )}
    </div>
  );
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default Pictures;
