import React, { useState } from 'react';
import "./App.css";
import image from "./images/mynaui_download.svg";
import Background from "./Components/background/background";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { uploadImage } from "./apiService";

function App() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await uploadImage(formData);
        if (response.imageUrl) {
          navigate(`/pictures?imageUrl=${encodeURIComponent(imageUrl)}`);
        }

        setFile(selectedFile);
      } catch (error) {
        console.error("Error uploading image : ", error);
      }
    }
  };

  return (
    <div className="App">
      <Background />
      <div className="container">
        <div className="upload-image">
          <h2 className="form-title">
            Click the button below to upload your image
          </h2>
          <div className="form-container">
            <form method="post" encType="multipart/form-data">
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

function Pictures() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const imageUrl = queryParams.get("imageUrl");

  return (
    <div className="Pictures">
      <h2>Your uploaded image</h2>
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
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