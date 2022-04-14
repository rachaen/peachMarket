import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Articles from './components/articles/articles';
import Home from './components/home/home';
import Kakaomap from './components/login/kakaomap';
import Login from './components/login/login';
import NotFound from './components/notFound';
import UploadPost from './components/posting/uploadPost';
import Signup from './components/signup/signup';
import Auth from './hoc/auth.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={Auth(<NotFound />, true)} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/kakaomap" element={<Kakaomap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posting" element={Auth(<UploadPost />, true)} />
        <Route path="/articles/:postId" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
