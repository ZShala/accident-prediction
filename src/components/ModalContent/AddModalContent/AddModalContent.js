import React, { useState, useEffect } from 'react';
import classes from './AddModalContent.module.css';
import CloseBtn from '../../../assets/images/cancel.png';
import FormInput from '../../Form-Input/Form-Input';
import Button from '../../UI/Button/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
}));

const ModalContent = (props) => {
  const materialClasses = useStyles();
  const [attr, setAttr] = useState({
    description: '',
    humidity: '', 
    pressure: '', 
    temp: '',
    visibility: '',
    wind_speed: '',
    weather: '',
    location: null,
    datetime: new Date().toISOString(),
    severity: '',
    vehicles_involved: '', 
    people_involved: '', 
    casualties: '',
    road_category: '', 
    speed_limit: ''
  })

  const handleChange = event => {
    const { value, name } = event.target;

    if(name === 'lon' || name === 'lat') {
      setAttr({
        ...attr,
        location: {
          ...attr.location,
          coordinates: {
            lon: attr.location ? attr.location.coordinates.lon : '',
            lat: attr.location ? attr.location.coordinates.lat : '',
            [name]: value
          }
        }
      })
      return;
    }
    setAttr({
      ...attr, 
      [name]: value 
    });
  };

  const saveAccidentRequest = async () => {
    if(!attr.datetime || !attr.location.coordinates) {
      alert('Ju lutem plotesoni kohen dhe koordinatat')
    }
    const url = 'http://localhost:5000/api/accident/addAccident';
    const body = {
      ...attr,
      location: {
        type: 'Point',
        coordinates: [
          attr.location.coordinates.lon,
          attr.location.coordinates.lat
        ]
      }
    };
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers,
      body: JSON.stringify(body)
    });
  }

  const handleCoordinates = () => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(successMeasure, failedMeasure, options);
    } else {
      console.log("Not Available");
    }
  }
  
  const successMeasure = (position) => {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    setAttr({
      ...attr,
      location: {
        ...attr.location,
        coordinates: {
          lon: longitude,
          lat: latitude
        }
      }
    })
  } 

  const failedMeasure = (error) => {
    console.log('Error :', error)
  }

  const handleDatePicker = async (event) => {
    if(!attr.location.coordinates.lon || !attr.location.coordinates.lat) {
      alert('Generate coordinates')
    };
    setAttr({
      ...attr,
      datetime: event.target.value
    })
    openWeatherMap(event.target.value);
  }

  const openWeatherMap = async (date) => {
    const unixTimestamp = Date.parse(date);
    const url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=${attr.location.coordinates.lat}&lon=${attr.location.coordinates.lon}&exclude=minutely,hourly,daily&dt=${unixTimestamp}&units=metric&appid=9a8c672317155355f1cfd7ff75a930ea`;
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers
    });
    const data = await response.json();
    let weather = '';
    data.current && data.current.weather.forEach((el, i) => {
      if(i > 1)
       weather += `, ${el.main}`
      else weather += `${el.main}`
    })

    const {humidity, pressure, temp, visibility, wind_speed} = data.current;

    setAttr({
      ...attr,
      humidity, 
      pressure, 
      temp, 
      visibility, 
      wind_speed,
      weather
    });
  }

  return (
      <div className={classes.Modal}>
        <img className={classes.Cancel} src={CloseBtn} alt='Cancel' onClick={props.closed} />
        <FormInput 
          name='description'
          type='text'
          value={attr.description}
          handleChange={handleChange}
          label='Pershkrimi i aksidentit'
        />
        <FormInput
          name='severity'
          type='number'
          value={attr.severity}
          handleChange={handleChange}
          label='Rrezikshmëri'
        />
        <FormInput
          name='vehicles_involved'
          type='number'
          value={attr.vehicles_involved}
          handleChange={handleChange}
          label='Vetura të përfshira'
        />
        <FormInput
          name='people_involved'
          type='number'
          value={attr.people_involved}
          handleChange={handleChange}
          label='Përsona të përfshirë'
        />
        <FormInput
          name='casualties'
          type='number'
          value={attr.casualties}
          handleChange={handleChange}
          label='Fatalitet'
        />
        <FormInput
          name='road_category'
          type='text'
          value={attr.road_category}
          handleChange={handleChange}
          label='Kategoria e rrugës'
        />
        <FormInput
          name='speed_limit'
          type='number'
          value={attr.speed_limit}
          handleChange={handleChange}
          label='Shpejtësia e lejuar'
        />
        <button onClick={handleCoordinates}>Gjenero Koordinatat</button>
        <FormInput
          name='lon'
          type='number'
          value={attr.location ? attr.location.coordinates.lon : ''}
          handleChange={handleChange}
          label='Longitute'
          required
        />
        <FormInput
          name='lat'
          type='number'
          value={attr.location ? attr.location.coordinates.lat : ''}
          handleChange={handleChange}
          label='Latitude'
          required
        />
        <TextField
          id="datetime-local"
          label="Next appointment"
          type="datetime-local"
          defaultValue={new Date().toISOString()}
          className={materialClasses.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onBlur={handleDatePicker}
        />
        <FormInput
          name='humidity'
          type='number'
          value={attr.humidity}
          handleChange={handleChange}
          label='Lagështia e ajrit'
        />
        <FormInput
          name='temperature'
          type='number'
          value={attr.temp}
          handleChange={handleChange}
          label='Temperatura (Celsius)'
        />
        <FormInput
          name='weather'
          type='text'
          value={attr.weather}
          handleChange={handleChange}
          label='Moti'
        />
        <FormInput
          name='visibility'
          type='number'
          value={attr.visibility}
          handleChange={handleChange}
          label='Dukshmëria'
        />
        <FormInput
          name='wind_speed'
          type='number'
          value={attr.wind_speed}
          handleChange={handleChange}
          label='Shpejtësia e erës'
        />
        <Button btnType='Success' clicked={saveAccidentRequest}>Shto Aksidentin</Button>
      </div>
  )
}

export default ModalContent;