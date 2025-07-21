import React, { useState } from 'react';
import { API_KEY } from './apiKey';
import './Designs/Neows.css';


const Asteroids = () => {
    const [neos,setNeos] = useState([]);
    const [loading,setLoading] = useState(false);

    const getToday = ()=> new Date().toISOString().split('T')[0];

    const getNextWeek = ()=>{
        const date = new Date();
        date.setDate(date.getDate()+7);
        return date.toISOString().split('T')[0];
    };

    const fetchNeos = async() => {
        setLoading(true);
        const startDate = getToday();
        const endDate = getNextWeek();
        
        try{
            const response = await fetch( `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`)
            const data = await response.json();

            const objects = Object.values(data.near_earth_objects).flat();
            setNeos(objects);
            console.log(objects);

        }catch(error){
            console.error("Failed to fetch Neos : ",error);
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className='neo-container'>
        <h1>Near-Earth Asteroids this week</h1>
        <button onClick={fetchNeos} > Fetch NEOs</button>

        {loading && <p>Loading...</p>}

        {!loading && neos && neos.length>0 &&(
            <ul>

            {neos.map((neo) => (
            <li key={neo.id}>
              <strong>{neo.name}</strong> <br />
              <span>Close Approach: {neo.close_approach_data[0].close_approach_date}</span><br />
              <span>Speed: {parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)} km/h</span><br />
              <span>Distance: {parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toFixed(0)} km</span><br />
              <span>Hazardous: {neo.is_potentially_hazardous_asteroid ? "Yes 🚨" : "No ✅"}</span>
              <hr />
            </li>
          ))}

            </ul>
        )}
      
    </div>
  )
}

export default Asteroids;
