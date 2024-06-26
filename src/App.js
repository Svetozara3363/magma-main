import React, { useState, useEffect } from "react";
import "./App.css";
import image from "./images/mynaui_download.svg";
import Background from "./Components/background/background";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const success = await uploadImage(selectedFile);
      if (success) {
        navigate(`/pictures`);
      }
      setFile(selectedFile);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("picture", file);

    try {
      const response = await fetch(`https://dokalab.com/api/upload`, {
        method: "POST",
        body: formData,
        headers: {
          'Session-ID': getCookie('session_id')
        }
      });
      if (response.ok) {
        const data = await response.json();
        return true;
      } else {
        console.error("Failed to upload the image.");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
    return false;
  };

  return (
    <div className="App">
      <Background />
      <div className="container">
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
      </div>
    </div>
  );
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function Pictures() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("https://dokalab.com/api/pictures", {
          headers: {
            'Session-ID': getCookie('session_id')
          }
        });
        if (response.ok) {
          const blob = await response.blob();
          const imageObjectURL = URL.createObjectURL(blob);
          setImageData(imageObjectURL);
        } else {
          console.error("Failed to fetch the image.");
        }
      } catch (error) {
        console.error("Error fetching image: ", error);
      }
    };
    fetchImage();
  }, []);

  const deleteImage = async () => {
    try {
      const response = await fetch(`https://dokalab.com/api/pictures`, {
        method: "DELETE",
        headers: {
          'Session-ID': getCookie('session_id')
        }
      });
      if (response.ok) {
        console.log("Image deleted successfully");
        // Перейти на главную страницу после удаления
        window.location.href = "/";
      } else {
        console.error("Failed to delete the image.");
      }
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  return (
    <div className="Pictures">
      <h2>Your uploaded image</h2>
      {imageData ? (
        <div>
          <img src={imageData} alt="Uploaded" className="uploaded-image" />
          <button onClick={deleteImage}>Delete Image</button>
        </div>
      ) : (
        <p>No image uploaded.</p>
      )}
    </div>
  );
}

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pictures" element={<Pictures />} />
      </Routes>
    </Router>
  );
}

export default Main;
