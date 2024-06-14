import React from 'react';

function UploadForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('picture', event.target.picture.files[0]);

        fetch('http://dokalab.com/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Session-ID': getCookie('session_id')
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('File uploaded successfully:', data);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" name="picture" accept="image/*" required />
            <button type="submit">Upload</button>
        </form>
    );
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default UploadForm;
