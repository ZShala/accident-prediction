import React, { useState } from 'react';
import classes from './AddModalContent.module.css';
import CloseBtn from '../../../assets/images/cancel.png';
import FormInput from '../../Form-Input/Form-Input';
import Button from '../../UI/Button/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
    name: '',
    location: '',
    date: '',
    currentData: null,
    coordinates: {
      lon: '',
      lat: ''
    }
  })

  const handleChange = event => {
    const { value, name } = event.target;

    if(name === 'lon' || name === 'lat') {
      setAttr({
        ...attr,
        coordinates: {
          ...attr.coordinates,
          [name]: value
        }
      })
      return;
    }
    setAttr({
      ...attr, 
      [name]: value 
    });
  };

  const handleCoordinates = () => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(successMeasure, failedMeasure, options);
    } else {
      console.log("Not Available");
    }
  }
  
  const successMeasure = (position) => {
    console.log('Position is: :', position)
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    setAttr({
      ...attr,
      coordinates: {
        lon: longitude,
        lat: latitude
      }
    })
  } 

  const failedMeasure = (error) => {
    console.log('Error :', error)
  }

  const handleDatePicker = async (event) => {
    console.log('event.target.value', event.target.value)
    console.log('Date.parse(event.target.value)', Date.parse(event.target.value))
    const unixTimestamp = Date.parse(event.target.value);
    const url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=${attr.coordinates.lat}&lon=${attr.coordinates.lon}&exclude=minutely,hourly,daily&dt=${unixTimestamp}&units=metric&appid=9a8c672317155355f1cfd7ff75a930ea`;
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json();
    const weather = '';
    data.currentData.weather.forEach((el, i) => {
      if(i > 1)
       weather += `, ${el.main}`
      else weather += `${el.main}`
    })
    setAttr({
      ...attr,
      currentData: data.current,
      weather: weather
    });
  }
  return (
      <div className={classes.Modal}>
        <img className={classes.Cancel} src={CloseBtn} alt='Cancel' onClick={props.closed} />
        <FormInput 
          name='name'
          type='text'
          value={attr.name}
          handleChange={handleChange}
          label='Emri i raportuesit'
          required
        />
        <FormInput
          name='location'
          type='text'
          value={attr.location}
          handleChange={handleChange}
          label='Lokacioni i aksidentit'
          required
        />
        <FormInput
          name='date'
          type='date'
          value={attr.date}
          handleChange={handleChange}
          label='Data e aksidentit'
          required
        />
        <button onClick={() => handleCoordinates()}>Gjenero Koordinatat</button>
        <FormInput
          name='lon'
          type='number'
          value={attr.coordinates.lon}
          handleChange={handleChange}
          label='Longitute'
          required
        />
        <FormInput
          name='lat'
          type='number'
          value={attr.coordinates.lat}
          handleChange={handleChange}
          label='Latitude'
          required
        />
        <TextField
          id="datetime-local"
          label="Next appointment"
          type="datetime-local"
          defaultValue="2017-05-24T10:30"
          className={materialClasses.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onBlur={handleDatePicker}
        />
        {console.log('attr', attr)}
        <FormInput
          name='humidity'
          type='number'
          value={attr.currentData ? attr.currentData.humidity : ''}
          handleChange={handleChange}
          label='Humidity'
        />
        <FormInput
          name='temperature'
          type='number'
          value={attr.currentData ? attr.currentData.temp : ''}
          handleChange={handleChange}
          label='Temperature (Celsius)'
        />
        <FormInput
          name='temperature'
          type='number'
          value={attr.weather}
          handleChange={handleChange}
          label='Temperature (Celsius)'
        />
        <Button btnType='Success'>Shto Aksidentin</Button>
      </div>
  )
}

export default ModalContent;