import React from 'react';
import './App.css';
import {YandexMap} from "./components/YandexMap";
import SideBar from "./components/SideBar";

const App: React.FC = () => {
  return (
    <div className="App">
      <SideBar />
        <YandexMap />
    </div>
  );
}

export default App;
