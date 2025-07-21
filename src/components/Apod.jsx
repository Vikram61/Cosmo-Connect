import React, { useState } from 'react'
import { API_KEY } from './apiKey'
import './Designs/Apod.css';
const Apod = () => {

    const [data,setData] = useState(null);

    const handleCLick = async() => {
        try{
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
            const data = await response.json();
            setData(data);


        }catch(error){
            console.error(error);

        }
    }

  return (
    <div className='apod-wrapper' >
      <h1>NASA Astronomy Picture of the Day</h1>
      <button onClick={handleCLick} >
        Get Today's Picture</button>


      {data && (
        <div className="image-container">
            <h2>{data.title}</h2>
            <img src={data.url}  alt={data.title}  />
            <p> {data.explanation} </p>
        </div>
      )}

    </div>
  )
}

export default Apod
