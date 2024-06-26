import { useState, useEffect } from "react";
import "./App.css";
import image from "./images/mynaui_download.svg";
import checkmark from "./images/eva_checkmark-outline.svg";
import back from "./images/lets-icons_refund-back.svg";
import { API_URL } from "./env";
import Background from "./Components/background/background";

function App() {
  const [flag, setFlag] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    if (flag) {
      fetchImage();
    }
  }, [flag]);

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
    setUploadedImage(null);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setFlag(true);
      } else {
        console.error("Failed to upload the image: ");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const fetchImage = async () => {
    try {
      const response = await fetch(`${API_URL}/picture`);
      if (response.ok) {
        const blob = await response.blob();
        setUploadedImage(URL.createObjectURL(blob));
      } else {
        console.error("Failed to fetch the image: ");
      }
    } catch (error) {
      console.error("Error fetching image: ", error);
    }
  };

  const deleteImage = async () => {
    try {
      const response = await fetch(`${API_URL}/picture`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUploadedImage(null);
        setFlag(false);
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
              <img src={checkmark} alt="checkmark" />
            </div>
            <h2>Your image has been successfully uploaded</h2>
            {uploadedImage && (
              <>
                <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
                <button className="delete-btn" onClick={deleteImage}>Delete</button>
              </>
            )}
            <button className="back-btn" onClick={handleBackClick}>
              <span>Back</span>
              <img src={back} alt="back" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
