import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
