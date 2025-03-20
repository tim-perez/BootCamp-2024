import React, { useState, useEffect } from 'react';
import { Storage } from '@aws-amplify';
import { v4 as uuid } from 'uuid';
import './App.css';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  async function onChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const filetype = file.name.split('.').pop();
    const filename = `${uuid()}.${filetype}`;

    try {
      await Storage.put(filename, file, {
        contentType: file.type, // Ensures proper MIME type
      });
      fetchImages(); // Refresh images after upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  async function fetchImages() {
    try {
      const files = await Storage.list('');
      if (!files || !files.results) return;

      const signedFiles = await Promise.all(
        files.results.map(async (file) => {
          const signedFile = await Storage.get(file.key);
          return signedFile;
        })
      );
      setImages(signedFiles);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={onChange} />
        {images.map((image, index) => (
          <img src={image} key={index} alt={`Uploaded ${index}`} style={{ width: 500 }} />
        ))}
      </header>
    </div>
  );
}

export default App;