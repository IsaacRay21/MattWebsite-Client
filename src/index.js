import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import Photo from './pages/Photo';
import Video from './pages/Video';
import Audio from './pages/Audio';
import Contact from './pages/Contact';

import reportWebVitals from './reportWebVitals';

export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/> 
        <Route path="photo" element={<Photo />} />
        <Route path="video" element={<Video />} />
        <Route path="audio" element={<Audio />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div id="portal-root"></div>
    <App />   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
