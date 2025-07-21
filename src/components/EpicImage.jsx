import React, { useState } from 'react';
import { API_KEY } from './apiKey';
import './Designs/EpicImage.css';
const EpicImage = () => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const fetchImage = async () => {
    if (!selectedDate) {
      setError('Please select a date.');
      return;
    }

    setLoading(true);
    setError('');
    setImageData(null);

    const [year, month, day] = selectedDate.split('-');

    try {
      const response = await fetch(
        `https://api.nasa.gov/EPIC/api/natural/date/${selectedDate}?api_key=${API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      if (data.length > 0) {
        const image = data[0];
        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image.image}.png`;

        setImageData({
          url: imageUrl,
          caption: image.caption,
          date: image.date,
        });
      } else {
        setError('No images available for the selected date.');
      }
    } catch (err) {
      setError('Failed to fetch EPIC image.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="epic-container">
      <h1>🌍 NASA EPIC - Earth by Date</h1>
      <input
        type="date"
        max={new Date().toISOString().split('T')[0]}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="date-picker"
      /> <br/>
      <button onClick={fetchImage}>Get Image</button>

      {loading && <p>Loading image...</p>}
      {error && <p className="error">{error}</p>}

      {imageData && (
        <div className="epic-image">
          <img src={imageData.url} alt="EPIC Earth" />
          <p><strong>Date:</strong> {imageData.date}</p>
          <p><strong>Caption:</strong> {imageData.caption}</p>
        </div>
      )}
    </div>
  );
};

export default EpicImage;
