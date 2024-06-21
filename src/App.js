import React, { useEffect, useState } from "react";
import "./App.css";
import image from "./images/mynaui_download.svg";
import checkmark from "./images/eva_checkmark-outline.svg";
import back from "./images/lets-icons_refund-back.svg";
import { API_URL } from "./env";
import Background from "./Components/background/background";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [flag, setFlag] = useState(false);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!document.cookie.includes('session_id')) {
      document.cookie = `session_id=${uuidv4()}; path=/`;
    }
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      uploadImage(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleBackClick = () => {
    setFlag(false);
    setFile(null);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("picture", file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          'Session-ID': getCookie('session_id')
        }
      });
      if (response.ok) {
        setFlag(true);
        fetchImages();  // Refresh the list of images after upload
      } else {
        console.error("Failed to upload the image: ");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_URL}/pictures`, {
        headers: {
          'Session-ID': getCookie('session_id')
        }
      });
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        console.error("Failed to fetch images: ");
      }
    } catch (error) {
      console.error("Error fetching images: ", error);
    }
  };

  const deleteImage = async (imageId) => {
    try {
      const response = await fetch(`${API_URL}/delete_picture/${imageId}`, {
        method: "DELETE",
        headers: {
          'Session-ID': getCookie('session_id')
        }
      });
      if (response.ok) {
        fetchImages();  // Refresh the list of images after deletion
      } else {
        console.error("Failed to delete the image: ");
      }
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  return (
    <div className="App">
      <Background />
      <div className={`container ${flag ? "uploaded" : ""}`}>
        {!flag ? (
          <div className="upload-image">
            <h2 className="form-title">
              Click on the button below to upload your image
            </h2>
            <div className="form-container">
              <form method="post">
                <label htmlFor="file-upload" className="custom-file-upload">
                  <span>Add your image</span>
                  <img src={image} alt="icon-upload" />
                </label>
                <input
                  type="file"
                  id="file-upload"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </form>
            </div>
          </div>
        ) : (
          <div className="successful-upload">
            <div className="logo">
              <img src={checkmark} />
            </div>
            <h2>Your image has been successfully uploaded</h2>
            <button className="back-btn" onClick={handleBackClick}>
              <span>Back</span>
              <img src={back} />
            </button>
          </div>
        )}
      </div>
      <div className="image-list">
        {images.map(image => (
          <div key={image.id}>
            <img src={`${API_URL}/picture/${image.id}`} alt={image.filename} />
            <button onClick={() => deleteImage(image.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default App;
