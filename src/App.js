import React, { useState } from "react";
import "./App.css";
import image from "./images/mynaui_download.svg";
import Background from "./Components/background/background";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = await uploadImage(selectedFile);
      if (imageUrl) {
        console.log("Image uploaded, navigating to /pictures");
        navigate("/pictures");
      }
      setFile(selectedFile);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("picture", file);

    try {
        const response = await fetch(`/api/upload`, {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            return data.imageUrl;
        } else {
            console.error("Failed to upload the image.");
        }
    } catch (error) {
        console.error("Error uploading image: ", error);
    }
    return null;
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

function Pictures() {
  return (
    <div className="Pictures">
      <h2>Your uploaded image</h2>
      <img src="/uploads/uploaded_image.jpg" alt="Uploaded" className="uploaded-image" />
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
