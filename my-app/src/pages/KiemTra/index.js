import React, { useState } from "react";
import axios from "axios";
import { uploadImageEndpoint } from '../../utils/APIRoutes'

export default function KiemTra() {
    const [imageFile, setImageFile] = useState(null);

    const token = localStorage.getItem("user").replace(/"/g, '');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' // Update content type for file upload
    };

    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0]);
        }
    };

    const handleClick = () => {
        if (imageFile) {
            const formData = new FormData(); // Create FormData object to send the file
            formData.append('image', imageFile); // Append the image file to the FormData object

            axios.post(uploadImageEndpoint, formData, { headers }) // Send the POST request with the FormData and headers
                .then(response => {
                    console.log('Image uploaded successfully:', response);
                    // Handle success response here
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                    // Handle error response here
                });
        } else {
            console.warn('No image selected.');
            // Handle case where no image is selected
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <img alt="preview" src={imageFile && URL.createObjectURL(imageFile)} style={{ width: 300 }} />
            <button onClick={handleClick}>Upload Image</button>
        </div>
    );
}
