import React, { useState } from "react";
import "./App.css";
import image from "./images/mynaui_download.svg";
import checkmark from "./images/eva_checkmark-outline.svg";
import back from "./images/lets-icons_refund-back.svg";
import Background from "./Components/background/background";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

function App() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = await uploadImage(selectedFile);
      if (imageUrl) {
        navigate(`/pictures?imageUrl=${encodeURIComponent(imageUrl)}`);
      }
      setFile(selectedFile);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`https://dokalab.com/api/upload`, {
        method: "POST",
        body: formData,
        headers: {
          'Session-ID': getCookie('session_id')
        }
      });

      const textResponse = await response.text();
      if (response.ok) {
        try {
          const data = JSON.parse(textResponse);
          return data.imageUrl;
        } catch (error) {
          console.error("Failed to parse response as JSON. Server response:", textResponse);
          return textResponse; // Вернем текстовый ответ, если это не JSON
        }
      } else {
        console.error("Failed to upload the image. Server response:", textResponse);
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
            Нажмите на кнопку ниже, чтобы загрузить ваше изображение
          </h2>
          <div className="form-container">
            <form method="post" encType="multipart/form-data">
              <label htmlFor="file-upload" className="custom-file-upload">
                <span>Добавить изображение</span>
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const imageUrl = queryParams.get("imageUrl");

  return (
    <div className="Pictures">
      <h2>Ваше загруженное изображение</h2>
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
      ) : (
        <p>Изображение не загружено.</p>
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
