import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateClient from "./pages/CreateClient";
import ClientList from "./components/ClientList";
import ClientDetails from "./components/ClientDetails";
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<ClientList />} />
          <Route path="/cadastrar" element={<CreateClient />} />
          <Route path="/cliente/:id" element={<ClientDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
