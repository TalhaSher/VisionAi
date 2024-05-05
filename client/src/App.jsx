import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainComponent from "../components/MainComponent";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "192.168.8.102:3000";
  axios.defaults.withCredentials = false;
  return (
    <>
      <MainComponent />
    </>
  );
}

export default App;