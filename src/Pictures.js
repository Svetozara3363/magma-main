import React, { useState, useEffect } from "react";
import "./Pictures.css";

function Pictures() {
  const [imageUrl, setImageUrl] = useState(null);

  const fetchImage = async () => {
    try {
      const response = await fetch(`https://dokalab.com/api/pictures`);
      if (response.ok) {
        const imageBlob = await response.blob();
        const imageObjectUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageObjectUrl);
      } else {
        console.error("Failed to fetch the image.");
      }
    } catch (error) {
      console.error("Error fetching image: ", error);
    }
  };

  const deleteImage = async () => {
    try {
      const response = await fetch(`https://dokalab.com/api/pictures`, {
        method: "DELETE",
      });
      if (response.ok) {
        setImageUrl(null);
      } else {
        console.error("Failed to delete the image.");
      }
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="Pictures">
      <h2>Your uploaded image</h2>
      {imageUrl ? (
        <div>
          <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
          <button onClick={deleteImage}>Delete Image</button>
        </div>
      ) : (
        <p>No image uploaded.</p>
      )}
    </div>
  );
}

export default Pictures;
