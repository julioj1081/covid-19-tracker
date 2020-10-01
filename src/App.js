import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';

//importacion de infoBox
import InfoBox from './infoBox';
//importacion de map
import Map from './Map';
//importacion de tabla
import Table from './Table';
//importacion de promesa de sorteo mayor a menor
import { sortData } from './util';
//importacion de grafica
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  //select combobox
  const [country, setCountry] = useState('worldwide');
  //tabla
  const [tableData, setTableData] = useState([]);
  //mapas
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796}); 
  const[mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  //informacion del countryInfo 
  const [countryInfo, setCountryInfo] = useState({});
  //muestra todos
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
        

      })
  }, [])

  //https://disease.sh/v3/covid-19/all
  //https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    //The code inside
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {


          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2, //united states
              flag: country.countryInfo.flag
            }
          ));
          //promesa para sorteo para de mayor a menor
          const sortedData = sortData(data);
          //tablas //(data)
          setTableData(sortedData);
          //asignacion de country
          setCountries(countries);

          //para el mapa
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  //para cambiar
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    //console.log("tu pais => ", countryCode);
    setCountry(countryCode);

    //https://disease.sh/v3/covid-19/countries/[country]
    //
    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/countries/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {

        setCountry(countryCode);
        //all of the data from the country
        setCountryInfo(data); //toda la informacion del pais

        //al momento de elejir el pais cambiara el mapa y el zoom
        //console.log("cord => lat: ",data.countryInfo.lat, " cord => long: ", data.countryInfo.long);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);

      });
  }

  //console.log("country info => ", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 Tracker API</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}>{country.name} <img className="flag" src={country.flag}></img></MenuItem>
                ))
              }

              {/*           
            <MenuItem value="wordwide">Option 2</MenuItem>
            <MenuItem value="wordwide">Option 3</MenuItem>
            */}
            </Select>
          </FormControl>
        </div>
        <hr></hr>
        {/*INFO BOXS*/}
        <div className="app__stats">
          {/* <InfoBox title="Deaths" cases={1234} total={4000} />
           */
          }
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} /> <hr></hr>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/**Map */}
        <Map 
        countries={mapCountries}
        center={mapCenter}
        zoom={mapZoom}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by country</h3>

          {/**Table */}
          <Table countries={tableData} />

          {/**Graph */}
          <h3>Wordwide new cases</h3>
          <LineGraph />

        </CardContent>
      </Card>
    </div>
  );
}

export default App;
