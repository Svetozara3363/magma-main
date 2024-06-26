import React, { useState, useEffect } from 'react';

function Pictures() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch('/api/picture');
      if (response.ok) {
        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
      }
    };

    fetchImage();
  }, []);

  const handleDelete = async () => {
    await fetch('/api/picture', {
      method: 'DELETE',
    });
    setImage(null);
  };

  return (
    <div className="Pictures">
      <h1>Your uploaded image</h1>
      {image ? (
        <>
          <img src={image} alt="Uploaded" className="uploaded-image" />
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <p>No image found</p>
      )}
    </div>
  );
}

export default Pictures;
