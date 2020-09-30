import React, { useState, useEffect } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';

//importacion de infoBox
import InfoBox from './infoBox';
//importacion de map
import Map from './Map';

function App() {
  const [countries, setCountries] = useState([]);
  //selec
  const [country, setCountry] = useState('worldwide');

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
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  //para cambiar
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    //console.log("tu pais => ", countryCode);
    setCountry(countryCode);
  }

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
          <InfoBox title="Coronavirus Cases" cases={1234} total={2000} /> <hr></hr>
          <InfoBox title="Recovered" cases={123456} total={3000} />
          <InfoBox title="Deaths" cases={1234} total={4000} />
        </div>

        {/**Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by country</h3>
          {/**Table */}
          <h3>Wordwide new cases</h3>
          {/**Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
