import React, { useState } from "react";
import "./App.css";
import image from "./images/mynaui_download.svg";
import Background from "./Components/background/background";

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = await uploadImage(selectedFile);
      if (imageUrl) {
        console.log("Image uploaded successfully:", imageUrl);
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

export default App;
