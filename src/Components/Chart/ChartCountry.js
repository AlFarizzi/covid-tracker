import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

function ChartCountry(props) {
let iso = useParams();
let iso2 = iso.iso;    

const [confirmed, setConfirmed] = useState('');
const [recovered, setRecovered] = useState('');
const [deaths, setDeaths] = useState('');



useEffect(() => {
    const getData = async() => {
        try {
            let data = await axios(`https://covid19.mathdro.id/api/countries/${iso2}`); 
            setConfirmed(data.data.confirmed.value);
            setRecovered(data.data.recovered.value);
            setDeaths(data.data.deaths.value);
        } catch (error) {
            throw error.message;
        }
    }
    getData();
},[iso2])

let data = {
    labels: ['Terkonfirmasi', 'Sembuh', 'Meniggal'],
    datasets: [{
        label: "Data " + iso2,
        data: [confirmed,recovered,deaths],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
}

return (
        <div>
            <Bar data={data}/>
        </div>
    );
}

export default ChartCountry;