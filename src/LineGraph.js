import React, {useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2';

function LineGraph() {
    const [data, setData] = useState({});
    //en los proximos 120 dias
    //https://disease.sh/v3/covid-19/historical/all?lastdays=120

    useEffect(() =>{
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response => response.json())
        .then(data => {
            console.log("hey => ",data);
        })
    },[]);

    return (
        <div>
            <h1>Im a graph</h1>
            <Line />
        </div>
    )
}

export default LineGraph
