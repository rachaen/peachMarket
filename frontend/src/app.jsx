import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Kakaomap from "./components/login/kakaomap";
import Login from "./components/login/login";
import NotFound from "./components/notFound";
import Signup from "./components/signup/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/kakaomap" element={<Kakaomap />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
