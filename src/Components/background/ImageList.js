import React, { useEffect, useState } from 'react';

function ImageList() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('https://dokalab.com/pictures', {
            headers: {
                'Session-ID': getCookie('session_id')
            }
        })
        .then(response => response.json())
        .then(data => {
            setImages(data);
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
    }, []);

    return (
        <div>
            {images.map(image => (
                <div key={image.id}>
                    <img src={`https://dokalab.com/picture/${image.id}`} alt={image.filename} />
                    <button onClick={() => deleteImage(image.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

function deleteImage(imageId) {
    fetch(`https://dokalab.com/delete_picture/${imageId}`, {
        method: 'DELETE',
        headers: {
            'Session-ID': getCookie('session_id')
        }
    })
    .then(response => response.text())
    .then(result => {
        console.log('Image deleted:', result);
        // Обновите интерфейс соответственно
    });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default ImageList;
