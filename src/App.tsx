import React from 'react';
import './App.css';
import {Header} from "./components/Header";
import {YandexMap} from "./components/YandexMap";

function App() {
  return (
    <div className="App">
      <Header />
        <YandexMap />
    </div>
  );
}

export default App;
