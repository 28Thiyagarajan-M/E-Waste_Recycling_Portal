import React, { createContext } from "react";
import "./style.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";

export const AppContext = createContext(null);

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
