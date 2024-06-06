import React, { useState, useEffect } from 'react';
import { uploadImage, getImage, deleteImage } from '../apiService';

const ImageGallery = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('picture', file);

    try {
      setLoading(true);
      await uploadImage(formData);
      const img = await getImage();
      setImage(img);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteImage();
      setImage(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        const img = await getImage();
        setImage(img);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <input type="file" onChange={handleUpload} />
      <div>
        {image ? (
          <div>
            <img src={`http://dokalab.com/picture`} alt="Uploaded" />
            <button onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <p>No image uploaded</p>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
