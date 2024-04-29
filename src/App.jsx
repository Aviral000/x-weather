import axios from 'axios';
import React, { useState } from 'react'
import "./App.css"

export default function App() {
const [data, setData] = useState([]);
const [text, setText] = useState('');
const [show, setShow] = useState(false);

const apiCall = async () => {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?Key=95ed9302f2744be697e43459232912&q=${text.toLowerCase()}`);
        setData(response.data);
        setShow(true);
    } catch (error) {
        console.error(error);
        alert("Failed to fetch weather data");
        setShow(false);
    }
}

const toggle = () => {
    apiCall();
}

  return (
    <div className='container'>
        <div className='c1'>
            <input
                type="text"
                value={text}
                id='city'
                onChange={(e) => setText(e.target.value)}
                placeholder='Enter city name'
            />
            <button type='button' onClick={toggle}>Search</button>
        </div>
        {show && 
            <div className='c2'>
                <div className='card'>
                    Temperature
                    <p>{data.current.temp_c}&deg;C</p>
                </div>
                <div className='card'>
                    Humidity
                    <p>{data.current.humidity} %</p>
                </div>
                <div className='card'>
                    Condition
                    <p>{data.current.condition.text}</p>
                </div>
                <div className='card'>
                    Wind Speed
                    <p>{data.current.wind_kph} kph</p>
                </div>
            </div>
        }
    </div>
  )
}
