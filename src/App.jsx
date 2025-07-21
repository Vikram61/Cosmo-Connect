
import React,{useState} from 'react';
import {Routes,Route} from 'react-router-dom';
import Landingpage from './components/pages/Landingpage';
import Apod from './components/Apod';
import Asteroids from './components/Asteroids';

import EpicImage from './components/EpicImage';


const App = () => {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Landingpage/>} />
        <Route path='/apod' element={<Apod/>} />
        <Route path='/asteroids' element={<Asteroids/>} />
        <Route path='/epic' element={<EpicImage/>} />
      </Routes>
   
    </div>
  )
}

export default App
