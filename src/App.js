import React, { useState, useEffect } from "react";
import "./App.css";
import image from "./images/mynaui_download.svg";
import Background from "./Components/background/background";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = await uploadImage(selectedFile);
      if (imageUrl) {
        setImageUrl(imageUrl);
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
        navigate(`/`);
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
      {imageUrl && (
        <div className="Pictures">
          <h2>Your uploaded image</h2>
          <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
          <button onClick={deleteImage}>Delete Image</button>
        </div>
      )}
    </div>
  );
}

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pictures" element={<App />} />
      </Routes>
    </Router>
  );
}

export default Main;
